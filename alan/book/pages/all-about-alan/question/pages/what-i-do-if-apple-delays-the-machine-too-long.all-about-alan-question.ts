import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatIDoIfAppleDelaysTheMachineTooLong = {
  id: "01a0c5f7-000d-7f45-87e2-6725013ea6c9",
  type: "page-type/all-about-alan-question",
  slug: "what-i-do-if-apple-delays-the-machine-too-long",
  topic: "all-about-alan-topic/getting-off-anthropic",
  ask: "If Apple delays the 512GB Mac Studio past a tolerable timeline, is there an interim provider that is not itself a D, or does the wait simply extend?",
} as const satisfies AllAboutAlanQuestion
