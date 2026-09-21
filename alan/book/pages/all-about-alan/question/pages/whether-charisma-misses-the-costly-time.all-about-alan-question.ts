import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherCharismaMissesTheCostlyTime = {
  id: "01a0782e-0fd0-7d13-9c40-f6d6b1c7b805",
  type: "page-type/all-about-alan-question",
  slug: "whether-charisma-misses-the-costly-time",
  topic: "all-about-alan-topic/the-marriage-lever-i-cannot-read",
  ask: "My Charisma readout counts hours with anyone where my safety is a level above the difficulty. Can that serve as my marriage proxy, or does the time that moves the marriage cost more than that?",
} as const satisfies AllAboutAlanQuestion
