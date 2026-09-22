import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theThresholdUnderAScar = {
  id: "01a0ca1d-3402-73ec-a780-6aae70448bb4",
  type: "page-type/all-about-alan-topic",
  slug: "the-threshold-under-a-scar",
  title: "The Threshold Under A Scar",
  definition: "the level a scarred domain switches on at, and how far it can come down",
  parents: ["all-about-alan-topic/how-a-scarred-domain-comes-back"],
  related: [
    "all-about-alan-topic/how-hard-a-thing-is",
    "all-about-alan-topic/what-extinction-actually-clears",
  ],
  settled:
    "The level a scarred domain switches on at is not fixed. I think the coding threshold came down over time.\n\nLevel two seems to be coding's intrinsic difficulty, under whatever the scar was adding on top.",
} as const satisfies AllAboutAlanTopic
