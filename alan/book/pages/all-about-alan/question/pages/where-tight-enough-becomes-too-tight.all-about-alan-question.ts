import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whereTightEnoughBecomesTooTight = {
  id: "01a077e3-2055-7f38-af02-4c1bfb248889",
  type: "page-type/all-about-alan-question",
  slug: "where-tight-enough-becomes-too-tight",
  topic: "all-about-alan-topic/tight-clothes",
  ask: "Where is the boundary between tight enough and too tight for me, even on a default day?",
} as const satisfies AllAboutAlanQuestion
