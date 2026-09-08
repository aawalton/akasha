import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const capacityHours = {
  id: "01a06230-6146-730d-94a0-813e820d840d",
  pageTypeSlug: "readout-scale",
  slug: "capacity-hours",
  definition: "how much stress capacity a day has left in hand, counted in hours",
  blackAt: -4,
  redAt: 0,
  yellowAt: 4,
  greenAt: 8,
  blueAt: 12,
} as const satisfies ReadoutScale
