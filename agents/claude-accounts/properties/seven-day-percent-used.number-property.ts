import type { NumberProperty } from "@akasha/pages/number-property"

export type SevenDayPercentUsed = number

export const sevenDayPercentUsed = {
  id: "01a054d8-1d39-7b82-b6e2-afc9026c368b",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "seven-day-percent-used",
  propertySlug: "seven-day-percent-used",
  definition: "how much of the seven-day allowance is spent",
  max: 100,
} as const satisfies NumberProperty
