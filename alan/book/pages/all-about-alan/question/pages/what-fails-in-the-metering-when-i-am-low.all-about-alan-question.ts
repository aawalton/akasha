import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatFailsInTheMeteringWhenIAmLow = {
  id: "01a077ef-d2c0-776c-ac7f-eac3e19b6179",
  type: "page-type/all-about-alan-question",
  slug: "what-fails-in-the-metering-when-i-am-low",
  topic: "all-about-alan-topic/why-too-much-and-too-little-swap-over",
  ask: "What actually fails in the metering when I am low on resources?",
} as const satisfies AllAboutAlanQuestion
