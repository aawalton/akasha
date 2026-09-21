import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whenMyTermPoliciesExpire = {
  id: "01a0c595-55ea-7c4e-b6a8-ecc4e920a69b",
  type: "page-type/all-about-alan-question",
  slug: "when-my-term-policies-expire",
  topic: "all-about-alan-topic/when-the-life-cover-can-shrink",
  ask: "When does each of my two term policies expire, does each renew or re-rate, and how much warning do I get?",
} as const satisfies AllAboutAlanQuestion
