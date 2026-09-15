import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatTheYearsOfTheCompanyCostMe = {
  id: "01a077e3-98a6-7755-b24c-68eaa2876080",
  type: "page-type/all-about-alan-question",
  slug: "what-the-years-of-the-company-cost-me",
  topic: "all-about-alan-topic/holding-a-responsibility",
  ask: "What did the years of the company cost me, how long did they run, and how did they end?",
} as const satisfies AllAboutAlanQuestion
