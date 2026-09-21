import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherMyQuieterReflexesFireOffAMemory = {
  id: "01a0c593-9b80-7f83-bbaa-6a894e9ac00a",
  type: "page-type/all-about-alan-question",
  slug: "whether-my-quieter-reflexes-fire-off-a-memory",
  topic: "all-about-alan-topic/whether-anything-else-survives-the-gate",
  ask: "Do startle, gag, salivation and arousal fire off a remembered cue the way disgust does, or do they genuinely not fire?",
} as const satisfies AllAboutAlanQuestion
