import type { TextProperty } from "@akasha/pages-system/text-property"

export type CollectionAuthor = string

export const collectionAuthor = {
  id: "01a063de-2c60-7007-8302-4fabbdbc1223",
  pageTypeSlug: "text-property",
  slug: "collection-author",
  propertySlug: "author",
  definition: "who made a collection",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
