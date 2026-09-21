import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatLeavingTheCountryWouldActuallyCost = {
  id: "01a0c5a2-52e7-7d1b-a31e-881e9c3e97d9",
  type: "page-type/all-about-alan-question",
  slug: "what-leaving-the-country-would-actually-cost",
  topic: "all-about-alan-topic/the-layers-i-live-inside",
  ask: "What would expatriation actually cost me, priced against the exit tax on the liquid stock and on the illiquid startup stake?",
} as const satisfies AllAboutAlanQuestion
