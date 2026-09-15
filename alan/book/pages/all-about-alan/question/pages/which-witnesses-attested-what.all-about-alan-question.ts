import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichWitnessesAttestedWhat = {
  id: "01a077e7-c40e-77e1-bc96-2a1f6e73a02e",
  type: "page-type/all-about-alan-question",
  slug: "which-witnesses-attested-what",
  topic: "all-about-alan-topic/why-i-hold-the-book-true",
  ask: "Which of the witnesses attested what, and when had each witness already fallen out with Joseph Smith?",
} as const satisfies AllAboutAlanQuestion
