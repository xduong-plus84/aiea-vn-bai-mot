const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const activeDot = () => {
  if (
    arrowIcons[0].style.display === "none" &&
    arrowIcons[1].style.display === "block"
  ) {
    dotsContainer.className = "nav__dots first-current";
  }
  if (
    arrowIcons[0].style.display === "block" &&
    arrowIcons[1].style.display === "block"
  ) {
    dotsContainer.className = "nav__dots second-current";
  }
  if (
    arrowIcons[0].style.display === "block" &&
    arrowIcons[1].style.display === "none"
  ) {
    dotsContainer.className = "nav__dots third-current";
  }
};

const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width

  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";

  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";

  activeDot();
};

// arrow
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 500); // calling showHideIcons after 500ms
  });
});
// arrow

// drag
const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    carousel.scrollLeft +=
      positionDiff > firstImgWidth / 2 ? valDifference : -positionDiff;
    if (carousel.scrollLeft < 100) {
      arrowIcons[0].style.display = "none";
      arrowIcons[1].style.display = "block";
    }
    if (carousel.scrollLeft > 1300) {
      arrowIcons[0].style.display = "block";
      arrowIcons[1].style.display = "none";
    }
  } else {
    // if user is scrolling to the left
    carousel.scrollLeft -=
      positionDiff > firstImgWidth / 2 ? valDifference : -positionDiff;
    if (carousel.scrollLeft < 100) {
      arrowIcons[0].style.display = "none";
      arrowIcons[1].style.display = "block";
    }
    if (carousel.scrollLeft > 1300) {
      arrowIcons[0].style.display = "block";
      arrowIcons[1].style.display = "none";
    }
  }
};
const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};
const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};
// drag

// mouseScroll
const scrollH = (e) => {
  setTimeout(() => showHideIcons(), 500); // calling showHideIcons after 500ms
  // Prevent scroll default
  e.preventDefault();
  e = window.event || e;
  let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
  document.querySelector(".carousel").scrollLeft -= delta * 400;
};
(function mouseScroll() {
  if (document.querySelector(".carousel").addEventListener) {
    document
      .querySelector(".carousel")
      .addEventListener("mousewheel", scrollH, false);
    document
      .querySelector(".carousel")
      .addEventListener("DOMMouseScroll", scrollH, false);
  }
})();
// mouseScroll

// dots
const imgContainer = document.querySelector(".image__container");
const dotsContainer = document.querySelector(".nav__dots");

document.getElementById("dot1").addEventListener("click", () => {
  // active dot
  dotsContainer.className = "nav__dots first-current";

  // tranform
  document.querySelector(".carousel").scrollLeft = -2400;

  // check limitted
  setTimeout(() => {
    arrowIcons[0].style.display = "none";
    arrowIcons[1].style.display = "block";
  }, 500);
});

document.getElementById("dot2").addEventListener("click", () => {
  // active dot
  dotsContainer.className = "nav__dots second-current";

  // tranform
  document.querySelector(".carousel").scrollLeft = 700;

  // check limitted
  setTimeout(() => {
    arrowIcons[0].style.display = "block";
    arrowIcons[1].style.display = "block";
  }, 500);
});

document.getElementById("dot3").addEventListener("click", () => {
  // active dot
  dotsContainer.className = "nav__dots third-current";

  // tranform

  document.querySelector(".carousel").scrollLeft = 400 * 5;

  // check limitted
  setTimeout(() => {
    arrowIcons[0].style.display = "block";
    arrowIcons[1].style.display = "none";
  }, 500);
});
// dots

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
