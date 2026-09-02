import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SpecializedItemType = number

export const specializedItemType = {
  id: "01a05fcd-f555-706e-a4c3-2a13a46747d2",
  pageTypeSlug: "number-property",
  slug: "specialized-item-type",
  propertySlug: "specialized-item-type",
  definition: "the narrower sort of thing an item is",
  max: null,
} as const satisfies NumberProperty
