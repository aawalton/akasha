import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const safetyLevel = {
  id: "01a05f42-92f5-7002-8664-c64ed3b1dcd2",
  pageTypeSlug: "readout-scale",
  slug: "safety-level",
  definition: "how safe things are, counted in levels",
  redAt: 1,
  yellowAt: 2,
  greenAt: 3,
  blueAt: 4,
} as const satisfies ReadoutScale
