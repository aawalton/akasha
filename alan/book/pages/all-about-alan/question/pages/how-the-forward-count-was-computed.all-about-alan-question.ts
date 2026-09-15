import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howTheForwardCountWasComputed = {
  id: "01a077ec-34d8-701e-92f0-e4989b593185",
  type: "page-type/all-about-alan-question",
  slug: "how-the-forward-count-was-computed",
  topic: "all-about-alan-topic/the-ones-i-have-not-been-yet",
  ask: "How was the number actually computed, and did the number land in one moment of clarity or gradually through the burnout?",
} as const satisfies AllAboutAlanQuestion
