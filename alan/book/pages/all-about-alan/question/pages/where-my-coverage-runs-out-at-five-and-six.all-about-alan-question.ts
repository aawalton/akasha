import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whereMyCoverageRunsOutAtFiveAndSix = {
  id: "01a077e4-c6d0-7ad9-903e-d32aedd7f20a",
  type: "page-type/all-about-alan-question",
  slug: "where-my-coverage-runs-out-at-five-and-six",
  topic: "all-about-alan-topic/why-climbing-sets-off-the-fall",
  ask: "Where does my coverage run out at five and six, when the only two sixes I have are singing in front of people?",
} as const satisfies AllAboutAlanQuestion
