import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichRecoveryRulesAreUnwritten = {
  id: "01a077e5-8834-742d-b19b-856a3b35386b",
  type: "page-type/all-about-alan-question",
  slug: "which-recovery-rules-are-unwritten",
  topic: "all-about-alan-topic/rules-instead-of-a-brake",
  ask: "One recovery rule of mine is written down: if I don't want to, I can't. Which other recovery rules am I running on unwritten?",
} as const satisfies AllAboutAlanQuestion
