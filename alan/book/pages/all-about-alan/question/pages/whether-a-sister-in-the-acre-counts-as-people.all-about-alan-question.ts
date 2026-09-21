import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherASisterInTheAcreCountsAsPeople = {
  id: "01a0c601-4b97-7cb7-b902-50187cfd27f3",
  type: "page-type/all-about-alan-question",
  slug: "whether-a-sister-in-the-acre-counts-as-people",
  topic: "all-about-alan-topic/the-seven-that-came-back-alone",
  ask: "LitRPG came back read and never talked about, and Nova is the one who reads it with me. Does a sister in the acre regrow the part that never regrows, or sit beside it?",
} as const satisfies AllAboutAlanQuestion
