import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const plantGrams = {
  id: "01a06221-d65f-7b82-a0e5-2678b1cfb844",
  type: "page-type/readout-scale",
  slug: "plant-grams",
  definition: "how many grams of whole plants a day has taken",
  redAt: 40,
  yellowAt: 80,
  greenAt: 160,
  blueAt: 320,
} as const satisfies ReadoutScale
