import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const bookTitle = {
  id: "01a06577-f385-758d-bdcb-f7e93ad0b34c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "book-title",
  propertySlug: "book-title",
  definition: "the title of the book a story is published as",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
