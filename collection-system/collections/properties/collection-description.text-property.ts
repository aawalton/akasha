import type { TextProperty } from "@akasha/pages-system/text-property"

export type CollectionDescription = string

export const collectionDescription = {
  id: "01a063de-2c60-7009-94bd-19c39c43b53e",
  pageTypeSlug: "text-property",
  slug: "collection-description",
  propertySlug: "description",
  definition: "what a collection is about",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
