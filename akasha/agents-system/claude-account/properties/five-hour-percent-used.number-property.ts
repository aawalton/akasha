import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type FiveHourPercentUsed = number

export const fiveHourPercentUsed = {
  id: "01a054d8-1d39-7bc9-bb38-636d44d7d1fb",
  pageTypeSlug: "number-property",
  slug: "five-hour-percent-used",
  propertySlug: "five-hour-percent-used",
  definition: "how much of the five-hour allowance is spent",
  max: 100,
} as const satisfies NumberProperty
