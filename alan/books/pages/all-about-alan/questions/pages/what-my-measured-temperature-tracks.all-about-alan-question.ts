import type { AllAboutAlanQuestion } from "akasha/alan/books/pages/all-about-alan/questions/all-about-alan-question.page-type.types.ts"

export const whatMyMeasuredTemperatureTracks = {
  id: "01a077e5-3da5-7e75-bd64-e5bc94dfbac4",
  type: "all-about-alan-question",
  slug: "what-my-measured-temperature-tracks",
  topic: "how-warm-i-run",
  ask: "What does my measured temperature do when read against the safety dial?",
} as const satisfies AllAboutAlanQuestion
