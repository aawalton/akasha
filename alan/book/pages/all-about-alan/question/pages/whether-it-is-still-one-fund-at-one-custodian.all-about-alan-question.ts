import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherItIsStillOneFundAtOneCustodian = {
  id: "01a0c5a0-748d-77e1-811b-711d451bd5b2",
  type: "page-type/all-about-alan-question",
  slug: "whether-it-is-still-one-fund-at-one-custodian",
  topic: "all-about-alan-topic/the-one-stack-it-is-all-in",
  ask: "Is the liquid stock still wholly in one fund at one custodian, or has that moved since I last confirmed it?",
} as const satisfies AllAboutAlanQuestion
