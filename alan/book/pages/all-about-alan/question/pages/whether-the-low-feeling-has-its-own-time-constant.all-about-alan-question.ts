import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTheLowFeelingHasItsOwnTimeConstant = {
  id: "01a077e9-a71f-7b86-b5a1-7455995aa63b",
  type: "page-type/all-about-alan-question",
  slug: "whether-the-low-feeling-has-its-own-time-constant",
  topic: "all-about-alan-topic/the-low-feeling-that-costs-me-a-level",
  ask: "Does the modifier have its own time constant, or does it track something else that has one?",
} as const satisfies AllAboutAlanQuestion
