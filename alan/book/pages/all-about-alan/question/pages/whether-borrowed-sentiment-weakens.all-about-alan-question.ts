import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherBorrowedSentimentWeakens = {
  id: "01a077ed-59a3-70e1-acd4-6a96f1a625d5",
  type: "page-type/all-about-alan-question",
  slug: "whether-borrowed-sentiment-weakens",
  topic: "all-about-alan-topic/feeling-affection",
  ask: "I can borrow sentiment from someone I love enjoying a thing. Does that proxy weaken when their own enjoyment is faint or dutiful?",
} as const satisfies AllAboutAlanQuestion
