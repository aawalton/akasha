import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const backlogCount = {
  id: "01a05453-a4f1-7185-b176-4cc4ae7266f6",
  pageTypeSlug: "readout-scale",
  slug: "backlog-count",
  definition: "how many items are still waiting",
  yellowAt: 0,
  orangeAt: 11,
  redAt: 21,
  blackAt: 31,
} as const satisfies ReadoutScale
