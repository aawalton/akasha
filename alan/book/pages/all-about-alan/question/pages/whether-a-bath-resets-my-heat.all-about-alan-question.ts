import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherABathResetsMyHeat = {
  id: "01a077e5-3da4-7654-94c6-1fca7052712e",
  type: "all-about-alan-question",
  slug: "whether-a-bath-resets-my-heat",
  topic: "all-about-alan-topic/how-warm-i-run",
  ask: "Does my body resume producing heat once layers and a bath have warmed me, or does that borrowed heat only fill in until safety returns?",
} as const satisfies AllAboutAlanQuestion
