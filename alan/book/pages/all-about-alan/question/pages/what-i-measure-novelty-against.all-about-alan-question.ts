import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatIMeasureNoveltyAgainst = {
  id: "01a077e4-c71d-7893-b4b2-d210706ce647",
  type: "page-type/all-about-alan-question",
  slug: "what-i-measure-novelty-against",
  topic: "all-about-alan-topic/how-i-know-things",
  ask: "What do I measure novelty against: stored attempts, or distance from my model?",
} as const satisfies AllAboutAlanQuestion
