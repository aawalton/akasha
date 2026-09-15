import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatLosingAPractitionerCosts = {
  id: "01a077e4-76d1-72d5-a207-18f10628157f",
  type: "page-type/all-about-alan-question",
  slug: "what-losing-a-practitioner-costs",
  topic: "all-about-alan-topic/trusting-a-person-not-an-institution",
  ask: "Losing one practitioner would move a whole layer of the cascade rather than cost a single dependency. What is that loss priced at?",
} as const satisfies AllAboutAlanQuestion
