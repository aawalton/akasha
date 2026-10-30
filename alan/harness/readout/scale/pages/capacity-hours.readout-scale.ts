import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const capacityHours = {
  id: "01a06230-6146-730d-94a0-813e820d840d",
  type: "page-type/readout-scale",
  slug: "capacity-hours",
  definition: "the remaining hours of stress capacity a day has",
  blackAt: -4,
  redAt: 0,
  yellowAt: 4,
  greenAt: 8,
  blueAt: 12,
  createdAt: "2026-09-02T12:55:32.934Z",
  updatedAt: "2026-10-30T16:17:04.743Z",
} as const satisfies ReadoutScale
