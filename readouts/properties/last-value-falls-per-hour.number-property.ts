import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type LastValueFallsPerHour = number

export const lastValueFallsPerHour = {
  id: "01a08c30-b692-794d-b7fa-9af2debfa29c",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "last-value-falls-per-hour",
  propertySlug: "last-value-falls-per-hour",
  definition: "how much the reading last taken loses for each hour of clock",
  max: null,
} as const satisfies NumberProperty
