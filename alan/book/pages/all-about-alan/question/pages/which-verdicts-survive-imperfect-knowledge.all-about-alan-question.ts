import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichVerdictsSurviveImperfectKnowledge = {
  id: "01a077e4-c13c-7615-a7d4-e59b3cf8d9fb",
  type: "page-type/all-about-alan-question",
  slug: "which-verdicts-survive-imperfect-knowledge",
  topic: "all-about-alan-topic/the-ethics-i-worked-out",
  ask: "Which of the framework's verdicts survive losing the perfect knowledge, and is approximating that knowledge the bridge, or does a verdict invert instead?",
} as const satisfies AllAboutAlanQuestion
