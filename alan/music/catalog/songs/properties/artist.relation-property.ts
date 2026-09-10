import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type Artist = Slug

export const artist = {
  id: "01a06243-144b-7006-9730-d6fc5ce88a90",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "artist",
  propertySlug: "artist",
  definition: "the artist whose song it is",
  targetPageType: "page-type/artist",
} as const satisfies RelationProperty
