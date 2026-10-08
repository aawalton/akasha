import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherOneStoreServesBothQuestionShapes = {
  id: "01a077e5-043e-76ec-8d6f-8d76415ece75",
  type: "page-type/all-about-alan-question",
  slug: "whether-one-store-serves-both-question-shapes",
  topic: "all-about-alan-topic/what-i-gave-up-leaving-postgres",
  ask: "Does one store serve both the known-item question and the search at scale, so I never hold the data in two separate places and take the skew risk?",
  createdAt: "2026-09-06T18:04:52.670Z",
  updatedAt: "2026-09-15T15:47:09.000Z",
} as const satisfies AllAboutAlanQuestion
