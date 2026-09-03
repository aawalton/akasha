import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const twoConditionsOrOne = {
  id: "01a06559-9d65-7274-9193-07f0f99e4e11",
  pageTypeSlug: "all-about-alan-topic",
  slug: "two-conditions-or-one",
  title: "Two Conditions Or One",
  definition: "whether autism and ADHD in me are two things or one thing showing up twice",
  parentSlugs: ["having-adhd"],
  relatedSlugs: ["how-different-i-actually-am", "how-i-get-anything-done"],
  settled:
    "My executive function takes a hit from each, and only the ADHD side has anything aimed at it.",
  unsettled:
    "What would confirm or rule out one substrate under both is unworked, and whether the two come apart cleanly is unexamined.\n\nAlmost everything written about either is written as though they are two conditions, and how it would be reshaped is unconsidered.\n\nA list of the common misconceptions about ADHD is drafted and waiting on me; the autism one is already written.",
} as const satisfies AllAboutAlanTopic
