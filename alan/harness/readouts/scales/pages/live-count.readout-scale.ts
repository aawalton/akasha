import type { ReadoutScale } from "akasha/alan/harness/readouts/scales/readout-scale.page-type.types.ts"

export const liveCount = {
  id: "01a06559-e74c-7505-a0c3-0cea87098a33",
  type: "readout-scale",
  slug: "live-count",
  definition: "how many of something are open at once",
  redAt: 4,
  yellowAt: 2,
  greenAt: 1,
  blueAt: 0,
} as const satisfies ReadoutScale
