import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherMyOtherEstimatorsLearn = {
  id: "01a0c5a1-dc4e-7b15-8978-eeb3ec4e6c59",
  type: "page-type/all-about-alan-question",
  slug: "whether-my-other-estimators-learn",
  topic: "all-about-alan-topic/the-safety-ledger-i-keep-on-one-person",
  ask: "My physiology estimator learns person by person. Do the behaviour and uncertainty estimators carry their own per-person learning too?",
} as const satisfies AllAboutAlanQuestion
