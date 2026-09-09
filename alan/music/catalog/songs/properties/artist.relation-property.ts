import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Artist = Slug

export const artist = {
  id: "01a06243-144b-7006-9730-d6fc5ce88a90",
  pageTypeSlug: "relation-property",
  slug: "artist",
  propertySlug: "artist",
  definition: "the artist whose song it is",
  targetPageTypeSlug: "page-type/artist",
} as const satisfies RelationProperty
