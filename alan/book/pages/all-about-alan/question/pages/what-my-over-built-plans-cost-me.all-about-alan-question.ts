import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatMyOverBuiltPlansCostMe = {
  id: "01a0c5a6-b6f2-72d0-b129-cdfedcfabaed",
  type: "page-type/all-about-alan-question",
  slug: "what-my-over-built-plans-cost-me",
  topic: "all-about-alan-topic/the-plans-i-over-build",
  ask: "The visible cost is the plans being over-robust rather than absent. Where does that show: time planning over doing, rigidity once built, or all-or-nothing?",
} as const satisfies AllAboutAlanQuestion
