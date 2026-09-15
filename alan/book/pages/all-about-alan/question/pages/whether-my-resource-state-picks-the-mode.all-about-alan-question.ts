import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherMyResourceStatePicksTheMode = {
  id: "01a077e5-e07e-7a8c-9ac1-3a1f42560b5b",
  type: "page-type/all-about-alan-question",
  slug: "whether-my-resource-state-picks-the-mode",
  topic: "all-about-alan-topic/how-a-skill-gets-into-me",
  ask: "Does my resource state decide which mode of learning is even available to me?",
} as const satisfies AllAboutAlanQuestion
