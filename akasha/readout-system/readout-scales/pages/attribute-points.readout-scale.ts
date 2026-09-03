import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const attributePoints = {
  id: "01a06838-93c6-782a-a203-2e72a2eaa2de",
  pageTypeSlug: "readout-scale",
  slug: "attribute-points",
  definition: "the points an attribute earned against a day's target",
  redAt: 0.25,
  yellowAt: 0.5,
  greenAt: 1,
  blueAt: 2,
} as const satisfies ReadoutScale
