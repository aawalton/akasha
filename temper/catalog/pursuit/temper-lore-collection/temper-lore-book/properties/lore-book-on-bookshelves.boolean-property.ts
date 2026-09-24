import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const loreBookOnBookshelves = {
  id: "01a0d5da-b5a0-7fe0-9a45-4d8056544afe",
  type: "page-type/boolean-property",
  slug: "lore-book-on-bookshelves",
  propertySlug: "on-bookshelves",
  definition: "whether a book turns up on bookshelves at random rather than at places of its own",
  types: "ts",
} as const satisfies BooleanProperty
