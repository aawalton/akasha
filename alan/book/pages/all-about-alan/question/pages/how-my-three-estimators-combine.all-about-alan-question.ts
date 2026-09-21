import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howMyThreeEstimatorsCombine = {
  id: "01a0c5a1-9404-7b0e-8741-04de461dadb1",
  type: "page-type/all-about-alan-question",
  slug: "how-my-three-estimators-combine",
  topic: "all-about-alan-topic/how-i-read-whether-someone-is-safe",
  ask: "Each of the three lowers my score on its own, but how do they aggregate into one read? Worst wins, they sum, or they fuse by reliability?",
} as const satisfies AllAboutAlanQuestion
