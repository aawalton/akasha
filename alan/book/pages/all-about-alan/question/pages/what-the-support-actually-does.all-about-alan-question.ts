import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatTheSupportActuallyDoes = {
  id: "01a077ee-840c-7dba-8443-78959a8cff85",
  type: "page-type/all-about-alan-question",
  slug: "what-the-support-actually-does",
  topic: "all-about-alan-topic/playing-again",
  ask: "What is the support actually doing for my play, absorbing the risk of a flop or carrying me past the cold start?",
} as const satisfies AllAboutAlanQuestion
