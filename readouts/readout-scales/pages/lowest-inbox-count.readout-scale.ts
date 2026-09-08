import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const lowestInboxCount = {
  id: "01a06230-b155-759a-8649-ed876a1441e8",
  pageTypeSlug: "readout-scale",
  slug: "lowest-inbox-count",
  definition: "how near an inbox came to empty in a day",
  blackAt: 100,
  redAt: 20,
  yellowAt: 10,
  greenAt: 1,
  blueAt: 0,
} as const satisfies ReadoutScale
