import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichCompanyComesBackAsCapacityRises = {
  id: "01a077ef-889f-75a9-8f7a-1cc3f8bf5bde",
  type: "page-type/all-about-alan-question",
  slug: "which-company-comes-back-as-capacity-rises",
  topic: "all-about-alan-topic/the-year-i-cut-everyone-out",
  ask: "Which things come back as my capacity rises, in what order and at what point?",
} as const satisfies AllAboutAlanQuestion
