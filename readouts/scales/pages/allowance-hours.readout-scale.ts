import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const allowanceHours = {
  id: "01a063bd-a526-751e-97d3-d164d0908a7f",
  pageTypeSlug: "readout-scale",
  slug: "allowance-hours",
  definition: "how long until the weekly Claude allowance renews, counted in hours",
  redAt: 0,
  yellowAt: 24,
  greenAt: 48,
  blueAt: 72,
} as const satisfies ReadoutScale
