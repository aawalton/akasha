import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SaleAvg = number

export const saleAvg = {
  id: "01a06053-b381-7e47-8f7b-1921dc8dc919",
  pageTypeSlug: "number-property",
  slug: "sale-avg",
  propertySlug: "sale-avg",
  definition: "the average gold an item has sold for",
  max: null,
} as const satisfies NumberProperty
