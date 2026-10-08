import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const liveCount = {
  id: "01a06559-e74c-7505-a0c3-0cea87098a33",
  type: "page-type/readout-scale",
  slug: "live-count",
  definition: "how many of something are open at once",
  redAt: 4,
  yellowAt: 2,
  greenAt: 1,
  blueAt: 0,
  createdAt: "2026-09-03T03:39:45.868Z",
  updatedAt: "2026-09-15T16:23:31.000Z",
} as const satisfies ReadoutScale
