import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whyLoveResistsMe = {
  id: "01a077f0-df9b-7b49-86de-fa033947511b",
  type: "page-type/all-about-alan-question",
  slug: "why-love-resists-me",
  topic: "all-about-alan-topic/working-out-what-love-is",
  ask: "Does love resist me because love is a bundle, or because love needs modelling another person's inside?",
} as const satisfies AllAboutAlanQuestion
