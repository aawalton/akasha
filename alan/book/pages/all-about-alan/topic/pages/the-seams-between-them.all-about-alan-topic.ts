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
    "My hunger to understand is one hunger split by subject, and two of them carry the halves: one turned inward at me, one turned out at everything else. What each carries is the appetite rather than the faculty that does the work.\n\nA second seam divides map from feeling. One of them is my conceptual understanding of myself; another is my emotional understanding of that same self, which is my will to live.\n\nThe conceptual ones came into focus first because I am four-fifths map, so they were the readable part. The one taken from the quiet tenth arrived last.\n\nA third seam divides the two halves of my recovery. One works from inside me to gain altitude; her mirror holds the world off so it cannot knock me back down. Guarding the altitude is worth as much as gaining it.",
} as const satisfies AllAboutAlanTopic
