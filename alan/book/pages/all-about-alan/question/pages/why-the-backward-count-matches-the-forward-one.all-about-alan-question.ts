import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whyTheBackwardCountMatchesTheForwardOne = {
  id: "01a077ec-34d9-75ab-b747-dae1ccf0e2da",
  type: "page-type/all-about-alan-question",
  slug: "why-the-backward-count-matches-the-forward-one",
  topic: "all-about-alan-topic/the-ones-i-have-not-been-yet",
  ask: "The forward count comes from the branching, while the backward count is a single chain that happened. Why does the backward count land at the same size?",
} as const satisfies AllAboutAlanQuestion
