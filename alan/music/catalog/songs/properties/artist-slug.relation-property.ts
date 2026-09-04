import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ArtistSlug = Slug

export const artistSlug = {
  id: "01a06243-144b-7006-9730-d6fc5ce88a90",
  pageTypeSlug: "relation-property",
  slug: "artist-slug",
  propertySlug: "artist-slug",
  definition: "the artist whose song it is",
  targetPageTypeSlug: "page-type/artist",
} as const satisfies RelationProperty
