import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichPartOfAdhdHasCostMeMost = {
  id: "01a077e2-d79a-75e0-adc7-591c3c43da34",
  type: "all-about-alan-question",
  slug: "which-part-of-adhd-has-cost-me-most",
  topic: "all-about-alan-topic/having-adhd",
  ask: "Which part of ADHD has cost me most: executive function, attention, time, or working memory?",
} as const satisfies AllAboutAlanQuestion
