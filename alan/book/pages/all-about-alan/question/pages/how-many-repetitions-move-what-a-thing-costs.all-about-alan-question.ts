import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howManyRepetitionsMoveWhatAThingCosts = {
  id: "01a077e7-6eb2-7bfc-9057-fe4c7b4d5fed",
  type: "page-type/all-about-alan-question",
  slug: "how-many-repetitions-move-what-a-thing-costs",
  topic: "all-about-alan-topic/what-repetition-encodes",
  ask: "How many safe repetitions make a thing measurably cheaper for me, and how few unsafe repetitions make that thing a threat?",
} as const satisfies AllAboutAlanQuestion
