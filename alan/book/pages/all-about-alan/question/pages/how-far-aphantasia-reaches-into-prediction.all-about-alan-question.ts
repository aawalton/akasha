import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howFarAphantasiaReachesIntoPrediction = {
  id: "01a0786e-2579-739f-977e-91c00fe3ba07",
  type: "page-type/all-about-alan-question",
  slug: "how-far-aphantasia-reaches-into-prediction",
  topic: "all-about-alan-topic/the-odds-of-a-hard-evening",
  ask: "Does the aphantasia block predicting outcomes everywhere, or only where the outcome is another person?",
} as const satisfies AllAboutAlanQuestion
