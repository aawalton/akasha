import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const greenDayUnits = {
  id: "01a06297-07b1-7762-aa9f-d5a6cd460dd1",
  pageTypeSlug: "readout-scale",
  slug: "green-day-units",
  definition: "how much of a whole day's worth of one value a day came to",
  redAt: 0.25,
  yellowAt: 0.5,
  greenAt: 1,
  blueAt: 2,
} as const satisfies ReadoutScale
