import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoCollectionIndex = number

export const esoCollectionIndex = {
  id: "01a06343-f9f7-7000-b21d-baade49cf0ed",
  pageTypeSlug: "number-property",
  slug: "eso-collection-index",
  propertySlug: "eso-collection-index",
  definition: "the number The Elder Scrolls Online names a lore collection by",
  max: null,
} as const satisfies NumberProperty
