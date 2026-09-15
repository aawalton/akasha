import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatHappenedAtTheTurnsIOnlyNamed = {
  id: "01a077f2-16c7-797a-af4f-64fa4f1484d4",
  type: "page-type/all-about-alan-question",
  slug: "what-happened-at-the-turns-i-only-named",
  topic: "all-about-alan-topic/the-chapters-of-my-life",
  ask: "The road trip, Nauvoo and the year of isolation are named as turns in my life. What happened in each?",
} as const satisfies AllAboutAlanQuestion
