import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatNumbersTellAGovernedClimb = {
  id: "01a077e4-c6d0-75c6-a889-a3fff7d5545b",
  type: "page-type/all-about-alan-question",
  slug: "what-numbers-tell-a-governed-climb",
  topic: "all-about-alan-topic/why-climbing-sets-off-the-fall",
  ask: "What tells a governed climb from an ungoverned one in numbers, as a dose curve and a duration?",
} as const satisfies AllAboutAlanQuestion
