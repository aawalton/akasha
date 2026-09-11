import type { ReadoutScale } from "akasha/alan/harness/readouts/scales/readout-scale.page-type.types.ts"

export const sleepHours = {
  id: "01a06220-ef8b-737b-89a5-e91e27b8e1cb",
  type: "readout-scale",
  slug: "sleep-hours",
  definition: "how long a night was, counted in hours",
  redAt: 6,
  yellowAt: 7,
  greenAt: 8,
  blueAt: 9,
} as const satisfies ReadoutScale
