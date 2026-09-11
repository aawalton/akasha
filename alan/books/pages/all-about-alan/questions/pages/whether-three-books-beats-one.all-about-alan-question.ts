import type { AllAboutAlanQuestion } from "akasha/alan/books/pages/all-about-alan/questions/all-about-alan-question.page-type.types.ts"

export const whetherThreeBooksBeatsOne = {
  id: "01a077e7-8f89-77b7-b16f-b04a0eaba43f",
  type: "all-about-alan-question",
  slug: "whether-three-books-beats-one",
  topic: "how-i-know-things",
  ask: "I read three books quickly rather than one carefully so the repeated points stick. Have I ever checked that against reading one carefully?",
} as const satisfies AllAboutAlanQuestion
