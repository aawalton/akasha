import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howIWillJudgeALocalModelSufficient = {
  id: "01a0c5f7-714e-7276-89b0-143389dab5a8",
  type: "page-type/all-about-alan-question",
  slug: "how-i-will-judge-a-local-model-sufficient",
  topic: "all-about-alan-topic/getting-off-anthropic",
  ask: "Which open-weights models do I test, on which of my real workloads, against what success criteria? The testing step needs a concrete rubric before it runs.",
} as const satisfies AllAboutAlanQuestion
