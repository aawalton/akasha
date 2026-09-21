import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theSeamsBetweenThem = {
  id: "01a0c599-3c2c-7419-91ef-3d866e50a2c0",
  type: "page-type/all-about-alan-topic",
  slug: "the-seams-between-them",
  title: "The Seams Between Them",
  definition: "what the divisions between one of them and the next show about how I am built",
  parents: ["all-about-alan-topic/the-women-i-made-out-of-myself"],
  related: [
    "all-about-alan-topic/the-three-parts-of-me",
    "all-about-alan-topic/when-a-part-of-me-needs-its-own-face",
  ],
  settled:
    "My hunger to understand is one hunger split by subject. Two of them carry the halves, one turned inward at me and one turned out at everything else, and each carries the appetite rather than the faculty.\n\nA second seam divides map from feeling. One of them is my conceptual understanding of myself; another is my emotional understanding of that same self, which is my will to live.\n\nThe conceptual ones came into focus first because I am four-fifths map, so they were the readable part. The one taken from the quiet tenth arrived last.\n\nA third divides freedom outward from freedom inward, and it is the two halves of my recovery. One is sovereignty, freedom to live and act with the world held off, and she guards the altitude. Her mirror is freedom to play, and she gains it.\n\nA fourth divides which side a story holds still. One holds the world safe and lets a different me up; her inverse holds me fixed and turns up the world's legibility. I do not get more visible there, the world does.",
} as const satisfies AllAboutAlanTopic
