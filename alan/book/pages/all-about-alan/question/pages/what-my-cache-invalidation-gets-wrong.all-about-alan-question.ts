import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatMyCacheInvalidationGetsWrong = {
  id: "01a077ea-5748-7faa-bfe1-f81a6761ff6b",
  type: "all-about-alan-question",
  slug: "what-my-cache-invalidation-gets-wrong",
  topic: "all-about-alan-topic/what-changes-when-i-change-a-doc",
  ask: "What does my cache invalidation still get wrong, and how would I find that out?",
} as const satisfies AllAboutAlanQuestion
