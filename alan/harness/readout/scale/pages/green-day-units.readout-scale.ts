import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const greenDayUnits = {
  id: "01a06297-07b1-7762-aa9f-d5a6cd460dd1",
  type: "page-type/readout-scale",
  slug: "green-day-units",
  definition: "how much of a whole day's worth of a value a day came to",
  redAt: 0.25,
  yellowAt: 0.5,
  greenAt: 1,
  blueAt: 2,
} as const satisfies ReadoutScale
