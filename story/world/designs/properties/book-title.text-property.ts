import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const bookTitle = {
  id: "01a06577-f385-758d-bdcb-f7e93ad0b34c",
  type: "page-type/text-property",
  slug: "book-title",
  propertySlug: "book-title",
  definition: "the title of the book a story is published as",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T04:12:35.077Z",
  updatedAt: "2026-09-19T05:02:31.000Z",
} as const satisfies TextProperty
