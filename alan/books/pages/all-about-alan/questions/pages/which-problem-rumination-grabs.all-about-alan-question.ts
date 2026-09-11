import type { AllAboutAlanQuestion } from "akasha/alan/books/pages/all-about-alan/questions/all-about-alan-question.page-type.types.ts"

export const whichProblemRuminationGrabs = {
  id: "01a077e6-106e-7882-899c-d63627908aff",
  type: "all-about-alan-question",
  slug: "which-problem-rumination-grabs",
  topic: "rumination",
  ask: "Does my rumination grab the day's most unresolved problem, or any open problem of the right size?",
} as const satisfies AllAboutAlanQuestion
