import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whereTheGraphDrawsFromElsewhere = {
  id: "01a077ec-26d2-7d13-bbba-3b2c5d629fd7",
  type: "page-type/all-about-alan-question",
  slug: "where-the-graph-draws-from-elsewhere",
  topic: "all-about-alan-topic/what-the-graph-is-made-of",
  ask: "Where does the graph draw from something other than pages, the filesystem or code?",
} as const satisfies AllAboutAlanQuestion
