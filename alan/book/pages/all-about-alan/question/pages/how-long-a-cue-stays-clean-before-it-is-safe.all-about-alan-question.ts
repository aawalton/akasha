import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howLongACueStaysCleanBeforeItIsSafe = {
  id: "01a077e5-95f0-74c4-94c3-1f64ff114f57",
  type: "page-type/all-about-alan-question",
  slug: "how-long-a-cue-stays-clean-before-it-is-safe",
  topic: "all-about-alan-topic/how-an-alarm-wears-off",
  ask: "How many clean repetitions, over how long, before my nervous system marks a cue safe?",
} as const satisfies AllAboutAlanQuestion
