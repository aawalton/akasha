import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const liveCount = {
  id: "01a06230-b155-73b0-b2a1-b675bdbee648",
  pageTypeSlug: "readout-scale",
  slug: "live-count",
  definition: "how many of something are open at once",
  redAt: 4,
  yellowAt: 2,
  greenAt: 1,
  blueAt: 0,
} as const satisfies ReadoutScale
