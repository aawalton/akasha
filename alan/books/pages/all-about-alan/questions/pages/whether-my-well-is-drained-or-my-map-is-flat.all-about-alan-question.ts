import type { AllAboutAlanQuestion } from "akasha/alan/books/pages/all-about-alan/questions/all-about-alan-question.page-type.types.ts"

export const whetherMyWellIsDrainedOrMyMapIsFlat = {
  id: "01a077ed-b13b-7a64-85c6-c55e5c3b0af7",
  type: "all-about-alan-question",
  slug: "whether-my-well-is-drained-or-my-map-is-flat",
  topic: "how-much-of-me-is-machine",
  ask: "A drained well could refill where a flat map would not. Is my well drained, or is my map simply flat in its affect?",
} as const satisfies AllAboutAlanQuestion
