import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichStoriesDidTheHeaviestLifting = {
  id: "01a077e7-2983-79c3-9f58-7eaa77154589",
  type: "page-type/all-about-alan-question",
  slug: "which-stories-did-the-heaviest-lifting",
  topic: "all-about-alan-topic/the-stories-that-buy-me-a-day",
  ask: "Which stories did the heaviest lifting for me, and what made one story land harder than another?",
} as const satisfies AllAboutAlanQuestion
