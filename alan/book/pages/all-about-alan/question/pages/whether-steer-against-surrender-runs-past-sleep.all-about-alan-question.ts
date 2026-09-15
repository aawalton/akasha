import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherSteerAgainstSurrenderRunsPastSleep = {
  id: "01a077ee-6625-7d2f-b160-e8bd9a397623",
  type: "page-type/all-about-alan-question",
  slug: "whether-steer-against-surrender-runs-past-sleep",
  topic: "all-about-alan-topic/the-pictures-at-the-edge-of-sleep",
  ask: "Does the steer-against-surrender axis run outside the sleep edge, through meditation and through how I handle feeling?",
} as const satisfies AllAboutAlanQuestion
