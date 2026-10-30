import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const backlogCount = {
  id: "01a05453-a4f1-7185-b176-4cc4ae7266f6",
  type: "page-type/readout-scale",
  slug: "backlog-count",
  definition: "how many things wait",
  yellowAt: 1,
  orangeAt: 11,
  redAt: 21,
  blackAt: 31,
  createdAt: "2026-08-30T20:19:22.993Z",
  updatedAt: "2026-10-30T16:16:50.706Z",
} as const satisfies ReadoutScale
