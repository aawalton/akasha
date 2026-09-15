import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherThreeThingsExhaustMyLove = {
  id: "01a077ef-9563-7111-aa8a-404f7d047e06",
  type: "page-type/all-about-alan-question",
  slug: "whether-three-things-exhaust-my-love",
  topic: "all-about-alan-topic/what-my-love-is-built-out-of",
  ask: "Do familiarity, usefulness and commitment exhaust my love, or do attraction and affection feed my love on their own?",
} as const satisfies AllAboutAlanQuestion
