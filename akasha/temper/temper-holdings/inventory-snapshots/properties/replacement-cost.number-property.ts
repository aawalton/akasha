import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ReplacementCost = number

export const replacementCost = {
  id: "01a06053-b381-7663-a677-ee3450fbac68",
  pageTypeSlug: "number-property",
  slug: "replacement-cost",
  propertySlug: "replacement-cost",
  definition: "what buying an item again would cost in gold",
  max: null,
} as const satisfies NumberProperty
