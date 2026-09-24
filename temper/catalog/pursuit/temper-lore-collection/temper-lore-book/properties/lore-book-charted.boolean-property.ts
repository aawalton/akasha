import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const loreBookCharted = {
  id: "01a0d5da-b5a0-7ac4-8390-1a6b07880b46",
  type: "page-type/boolean-property",
  slug: "lore-book-charted",
  propertySlug: "charted",
  definition: "whether the LoreBooks table counts where a book lies as known",
  types: "ts",
} as const satisfies BooleanProperty
