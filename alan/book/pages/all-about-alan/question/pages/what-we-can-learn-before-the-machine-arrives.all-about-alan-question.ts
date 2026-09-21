import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatWeCanLearnBeforeTheMachineArrives = {
  id: "01a0c5f7-cd13-73ab-b917-8455a20cb0a9",
  type: "page-type/all-about-alan-question",
  slug: "what-we-can-learn-before-the-machine-arrives",
  topic: "all-about-alan-topic/getting-off-anthropic",
  ask: "How much of the household's re-training on local tooling can happen during the wait, so the switch costs less when the hardware lands?",
} as const satisfies AllAboutAlanQuestion
