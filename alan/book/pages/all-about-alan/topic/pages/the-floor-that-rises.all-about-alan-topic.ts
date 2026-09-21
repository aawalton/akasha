import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFloorThatRises = {
  id: "01a0c65b-727b-7aa2-a23a-b73363c43357",
  type: "page-type/all-about-alan-topic",
  slug: "the-floor-that-rises",
  title: "The Floor That Rises",
  definition: "what I mean by a permanent solution, which is not a perfect one",
  parents: ["all-about-alan-topic/being-an-inventor-not-a-coder"],
  settled:
    "A permanent solution is not a perfect one. It gives a floor, and that floor rises over time. What it permanently solves is the issue of messes below the floor.\n\nI never know for sure that a solution is permanent, but there are attempts at permanent ones.\n\nThe folder-matches-a-shape check is a permanent solution to keeping files organised in folders.",
} as const satisfies AllAboutAlanTopic
