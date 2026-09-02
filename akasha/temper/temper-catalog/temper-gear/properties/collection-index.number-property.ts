import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CollectionIndex = number

export const collectionIndex = {
  id: "01a05fd1-d437-7503-943d-4cfbfe666121",
  pageTypeSlug: "number-property",
  slug: "collection-index",
  propertySlug: "collection-index",
  definition: "where a style sits in the game's own collection list",
  max: null,
} as const satisfies NumberProperty
