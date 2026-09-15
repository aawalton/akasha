import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const artist = {
  id: "01a06243-144b-7006-9730-d6fc5ce88a90",
  type: "relation-property",
  slug: "artist",
  propertySlug: "artist",
  definition: "the artist whose song it is",
  targetPageType: "page-type/artist",
  types: "ts",
} as const satisfies RelationProperty
