import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichNuanceIsWorthLosing = {
  id: "01a077e8-8945-77b2-bcf2-c356e1afcd06",
  type: "page-type/all-about-alan-question",
  slug: "which-nuance-is-worth-losing",
  topic: "all-about-alan-topic/what-a-model-leaves-out",
  ask: "Is any nuance worth losing, and what tells me which nuance that is?",
} as const satisfies AllAboutAlanQuestion
