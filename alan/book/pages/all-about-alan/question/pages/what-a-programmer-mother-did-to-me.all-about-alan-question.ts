import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatAProgrammerMotherDidToMe = {
  id: "01a077f2-9a83-7037-a04a-65b832314f39",
  type: "page-type/all-about-alan-question",
  slug: "what-a-programmer-mother-did-to-me",
  topic: "all-about-alan-topic/the-code-in-my-family",
  ask: "What did having a programmer for a mother through my whole childhood do to me?",
} as const satisfies AllAboutAlanQuestion
