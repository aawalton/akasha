import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FilterTypeSpecific = number

export const filterTypeSpecific = {
  id: "01a05fcd-f54e-7daa-82d0-15f58d598aa1",
  pageTypeSlug: "number-property",
  slug: "filter-type-specific",
  propertySlug: "filter-type-specific",
  definition: "the narrower tab the game files an item under",
  max: null,
} as const satisfies NumberProperty
