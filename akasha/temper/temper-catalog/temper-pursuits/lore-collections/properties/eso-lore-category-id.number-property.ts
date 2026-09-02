import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoLoreCategoryId = number

export const esoLoreCategoryId = {
  id: "01a06343-f9f7-7001-84ab-801b8b3eb20d",
  pageTypeSlug: "number-property",
  slug: "eso-lore-category-id",
  propertySlug: "eso-lore-category-id",
  definition: "the number The Elder Scrolls Online names a lore library category by",
  max: null,
} as const satisfies NumberProperty
