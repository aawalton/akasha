import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherStressReachesMyAppetiteBodily = {
  id: "01a077ee-5270-7ca2-9c7d-4961ca9995aa",
  type: "page-type/all-about-alan-question",
  slug: "whether-stress-reaches-my-appetite-bodily",
  topic: "all-about-alan-topic/what-makes-me-start-eating",
  ask: "Does stress reach my appetite by any bodily route, rather than only through capacity and convenience?",
} as const satisfies AllAboutAlanQuestion
