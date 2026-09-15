import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const collectionAuthor = {
  id: "01a063de-2c60-7007-8302-4fabbdbc1223",
  type: "page-type/text-property",
  slug: "collection-author",
  propertySlug: "author",
  definition: "who made a collection",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
