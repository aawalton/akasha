import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const twoConditionsOrOne = {
  id: "01a06559-9d65-7274-9193-07f0f99e4e11",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "two-conditions-or-one",
  title: "Two Conditions Or One",
  definition: "whether autism and ADHD in me are two things or one thing showing up twice",
  parents: ["having-adhd"],
  related: ["how-different-i-actually-am", "how-i-get-anything-done"],
  settled:
    "My executive function takes a hit from each, and only the ADHD side has anything aimed at it.",
} as const satisfies AllAboutAlanTopic
