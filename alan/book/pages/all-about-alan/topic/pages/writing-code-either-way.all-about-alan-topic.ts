import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const writingCodeEitherWay = {
  id: "01a0c5ff-124a-713c-9ca0-72c6373f80e0",
  type: "page-type/all-about-alan-topic",
  slug: "writing-code-either-way",
  title: "Writing Code Either Way",
  definition: "the same hour of coding run as an end and run as a means",
  parents: ["all-about-alan-topic/when-something-is-fun"],
  settled:
    "Writing code can be fun when the coding is the thing I am doing. That the code is also useful, that it ships and solves a problem, does not touch the fun, because the usefulness is incidental.\n\nThe same coding done to get the shipped feature, with my attention on the feature, is not fun.\n\nIdentical activity, opposite experience. The only thing that changed is which one is the end.\n\nSo the presence of a use never kills it. The demotion does.",
} as const satisfies AllAboutAlanTopic
