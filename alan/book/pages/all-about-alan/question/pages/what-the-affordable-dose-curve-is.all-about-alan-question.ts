import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatTheAffordableDoseCurveIs = {
  id: "01a077ed-3180-783c-ba13-6fd0f8161a81",
  type: "page-type/all-about-alan-question",
  slug: "what-the-affordable-dose-curve-is",
  topic: "all-about-alan-topic/how-much-company-i-can-take",
  ask: "What is the curve of the affordable dose of company against my capacity, which is qualitative today and has never been drawn?",
} as const satisfies AllAboutAlanQuestion
