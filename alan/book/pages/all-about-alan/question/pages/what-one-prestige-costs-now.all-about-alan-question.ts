import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatOnePrestigeCostsNow = {
  id: "01a077ee-fbc5-72f5-b721-0b9e541c6022",
  type: "page-type/all-about-alan-question",
  slug: "what-one-prestige-costs-now",
  topic: "all-about-alan-topic/how-often-i-start-over",
  ask: "What does one prestige cost me now, at four a day rather than one a month?",
} as const satisfies AllAboutAlanQuestion
