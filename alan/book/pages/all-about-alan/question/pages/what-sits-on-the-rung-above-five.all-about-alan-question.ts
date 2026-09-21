import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatSitsOnTheRungAboveFive = {
  id: "01a0c596-7051-700e-ab0e-2cd585d9acd8",
  type: "page-type/all-about-alan-question",
  slug: "what-sits-on-the-rung-above-five",
  topic: "all-about-alan-topic/the-rungs-of-my-safety-scale",
  ask: "My rung ladder stops at five and my instrument reads to six. What is the capability anchor on six?",
} as const satisfies AllAboutAlanQuestion
