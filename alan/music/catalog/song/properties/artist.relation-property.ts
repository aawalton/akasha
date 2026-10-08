import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const artist = {
  id: "01a06243-144b-7006-9730-d6fc5ce88a90",
  type: "page-type/relation-property",
  slug: "artist",
  propertySlug: "artist",
  definition: "the artist whose song it is",
  targetPageType: "page-type/artist",
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-09-15T16:30:55.000Z",
} as const satisfies RelationProperty
