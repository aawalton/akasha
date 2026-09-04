import type { ReadoutScale } from "../readout-scale.page-type.ts"

export const dailyInbox = {
  id: "01a06230-b155-714b-a469-f3da2c38d3a6",
  pageTypeSlug: "readout-scale",
  slug: "daily-inbox",
  definition: "how much is waiting in an inbox meant to be emptied each day",
  blackAt: 100,
  redAt: 10,
  yellowAt: 1,
  blueAt: 0,
  earnedColorSlug: "green",
} as const satisfies ReadoutScale
