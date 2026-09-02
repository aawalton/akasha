import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ArmorRating = number

export const armorRating = {
  id: "01a05fcd-f54c-74e6-bb9f-b196c110f6d4",
  pageTypeSlug: "number-property",
  slug: "armor-rating",
  propertySlug: "armor-rating",
  definition: "how much armor an item is worth",
  max: null,
} as const satisfies NumberProperty
