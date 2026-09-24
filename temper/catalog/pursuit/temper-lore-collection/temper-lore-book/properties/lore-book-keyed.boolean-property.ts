import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const loreBookKeyed = {
  id: "01a0d5da-b5a0-7ad2-8a95-fa2b13e451d5",
  type: "page-type/boolean-property",
  slug: "lore-book-keyed",
  propertySlug: "keyed",
  definition: "whether the LoreBooks table repeats a book's id inside that book's own entry",
  types: "ts",
} as const satisfies BooleanProperty
