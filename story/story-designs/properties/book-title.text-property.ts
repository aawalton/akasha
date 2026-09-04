import type { TextProperty } from "@akasha/pages-system/text-property"

export type BookTitle = string

export const bookTitle = {
  id: "01a06577-f385-758d-bdcb-f7e93ad0b34c",
  pageTypeSlug: "text-property",
  slug: "book-title",
  propertySlug: "book-title",
  definition: "the title of the book a story is published as",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
