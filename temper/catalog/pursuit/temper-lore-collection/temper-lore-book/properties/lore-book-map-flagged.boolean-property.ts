import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const loreBookMapFlagged = {
  id: "01a0d5da-b5a0-7c79-a38f-d72e0876da0e",
  type: "page-type/boolean-property",
  slug: "lore-book-map-flagged",
  propertySlug: "map-flagged",
  definition: "whether the LoreBooks table marks a book on one map rather than counting it there",
  types: "ts",
  createdAt: "2026-09-24T23:57:55.488Z",
  updatedAt: "2026-09-24T23:58:01.000Z",
} as const satisfies BooleanProperty
