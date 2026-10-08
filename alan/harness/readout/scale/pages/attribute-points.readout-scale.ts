import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const attributePoints = {
  id: "01a06838-93c6-782a-a203-2e72a2eaa2de",
  type: "page-type/readout-scale",
  slug: "attribute-points",
  definition: "the points an attribute earned against a day's target",
  blackAt: 0,
  redAt: 0.25,
  yellowAt: 0.5,
  greenAt: 1,
  blueAt: 2,
  createdAt: "2026-09-03T17:02:13.446Z",
  updatedAt: "2026-09-15T16:23:31.000Z",
} as const satisfies ReadoutScale
