import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const surplusHours = {
  id: "01a05fc3-145a-7dca-83d9-5316786fa83c",
  pageTypeSlug: "readout-scale",
  slug: "surplus-hours",
  definition: "how much of a night a day has left, counted in hours",
  blackAt: -12,
  redAt: -8,
  yellowAt: -4,
  greenAt: 0,
  blueAt: 4,
} as const satisfies ReadoutScale
