import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichSafetyReadingDecidesTheEncoding = {
  id: "01a077e7-6eb2-7e43-867a-03c1eac314f6",
  type: "all-about-alan-question",
  slug: "which-safety-reading-decides-the-encoding",
  topic: "all-about-alan-topic/what-repetition-encodes",
  ask: "Does the encoding turn on how safe I was at each repetition, on the average safety across the run, or on the lowest safety in the run?",
} as const satisfies AllAboutAlanQuestion
