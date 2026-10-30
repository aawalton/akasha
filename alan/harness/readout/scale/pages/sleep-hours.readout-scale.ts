import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const sleepHours = {
  id: "01a06220-ef8b-737b-89a5-e91e27b8e1cb",
  type: "page-type/readout-scale",
  slug: "sleep-hours",
  definition: "the hours of sleep Alan has in a night",
  redAt: 6,
  yellowAt: 7,
  greenAt: 8,
  blueAt: 9,
  createdAt: "2026-09-02T12:38:40.779Z",
  updatedAt: "2026-10-30T16:09:20.835Z",
} as const satisfies ReadoutScale
