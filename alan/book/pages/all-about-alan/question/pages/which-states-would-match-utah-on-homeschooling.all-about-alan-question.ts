import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichStatesWouldMatchUtahOnHomeschooling = {
  id: "01a0c5a2-30e0-7e9d-840c-4ed615bc41bb",
  type: "page-type/all-about-alan-question",
  slug: "which-states-would-match-utah-on-homeschooling",
  topic: "all-about-alan-topic/the-law-that-lets-us-homeschool",
  ask: "If Utah's homeschool friendliness erodes, which states match it, and what would each cost me in state tax to move to?",
} as const satisfies AllAboutAlanQuestion
