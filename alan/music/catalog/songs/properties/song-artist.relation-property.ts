import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type SongArtist = Slug

export const songArtist = {
  id: "01a0875e-3f43-7a26-a689-61a8729dedcc",
  pageTypeSlug: "relation-property",
  slug: "song-artist",
  propertySlug: "artist",
  definition: "the artist whose song it is",
  targetPageTypeSlug: "page-type/artist",
} as const satisfies RelationProperty
