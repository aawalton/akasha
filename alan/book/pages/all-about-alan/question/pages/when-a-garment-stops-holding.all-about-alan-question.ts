import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whenAGarmentStopsHolding = {
  id: "01a077e3-2056-7cf8-b937-b3550da4d882",
  type: "page-type/all-about-alan-question",
  slug: "when-a-garment-stops-holding",
  topic: "all-about-alan-topic/tight-clothes",
  ask: "Fabric stretches with wear, so at what point has a garment stopped holding me?",
} as const satisfies AllAboutAlanQuestion
