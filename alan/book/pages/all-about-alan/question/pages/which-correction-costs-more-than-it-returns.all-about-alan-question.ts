import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichCorrectionCostsMoreThanItReturns = {
  id: "01a077e8-9d27-70ff-a379-110e88f11b65",
  type: "page-type/all-about-alan-question",
  slug: "which-correction-costs-more-than-it-returns",
  topic: "all-about-alan-topic/self-improvement",
  ask: "I count editing myself live as almost always a net win. Which correction costs me more than that correction returns?",
} as const satisfies AllAboutAlanQuestion
