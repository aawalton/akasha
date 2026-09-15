import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatICurrentlyCallWeather = {
  id: "01a077ea-1093-750a-9a06-c93812d299a9",
  type: "all-about-alan-question",
  slug: "what-i-currently-call-weather",
  topic: "all-about-alan-topic/calling-something-weather",
  ask: "What do I currently call weather, what is still pulling that could be filed there, and what is filed wrongly so a drive got switched off too early?",
} as const satisfies AllAboutAlanQuestion
