import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoCategoryIndex = number

export const esoCategoryIndex = {
  id: "01a06165-ae0e-7000-940b-03b7446138c3",
  pageTypeSlug: "number-property",
  slug: "eso-category-index",
  propertySlug: "eso-category-index",
  definition: "the number The Elder Scrolls Online names a collectible category by",
  max: null,
} as const satisfies NumberProperty
