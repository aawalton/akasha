import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const artist = {
  id: "01a06243-144b-7006-9730-d6fc5ce88a90",
  type: "page-type/relation-property",
  slug: "artist",
  propertySlug: "artist",
  definition: "the artist of a song",
  targetPageType: "page-type/artist",
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-10-30T16:35:48.810Z",
} as const satisfies RelationProperty
