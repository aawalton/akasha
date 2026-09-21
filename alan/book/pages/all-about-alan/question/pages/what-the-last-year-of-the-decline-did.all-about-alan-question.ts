import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatTheLastYearOfTheDeclineDid = {
  id: "01a0c640-5e0f-7d64-8377-43ff442eea14",
  type: "page-type/all-about-alan-question",
  slug: "what-the-last-year-of-the-decline-did",
  topic: "all-about-alan-topic/the-arithmetic-of-the-decline",
  ask: "I have told the last year of the decline both ways: another fifty percent drop in capacity, and an unexpected fifty percent rise in load. Is it one, the other, or both?",
} as const satisfies AllAboutAlanQuestion
