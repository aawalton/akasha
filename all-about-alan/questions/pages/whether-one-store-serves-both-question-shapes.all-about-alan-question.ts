import type { AllAboutAlanQuestion } from "../all-about-alan-question.page-type.types.ts"

export const whetherOneStoreServesBothQuestionShapes = {
  id: "01a077e5-043e-76ec-8d6f-8d76415ece75",
  pageTypeSlug: "all-about-alan-question",
  type: "all-about-alan-question",
  slug: "whether-one-store-serves-both-question-shapes",
  topic: "what-i-gave-up-leaving-postgres",
  ask: "Does one store serve both the known-item question and the search at scale, so I never hold the data in two separate places and take the skew risk?",
} as const satisfies AllAboutAlanQuestion
