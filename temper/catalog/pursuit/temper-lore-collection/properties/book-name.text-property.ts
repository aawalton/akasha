import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const bookName = {
  id: "01a06343-f9f7-7003-a0d9-1c128c00db86",
  type: "page-type/text-property",
  slug: "book-name",
  propertySlug: "book-name",
  definition: "a lore book's name",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
