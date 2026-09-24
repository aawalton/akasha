import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const loreBookNumberedTitle = {
  id: "01a0d5da-b5a0-7d59-8a46-e5a88357bf3a",
  type: "page-type/number-property",
  slug: "lore-book-numbered-title",
  propertySlug: "numbered-title",
  definition: "a title the LoreBooks table holds as a number rather than as words",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
