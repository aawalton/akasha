import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const creditedArtist = {
  id: "01a0d4f9-4338-7000-869a-7e463ee6c4a0",
  type: "page-type/relation-property",
  slug: "credited-artist",
  propertySlug: "artist",
  definition: "the artist page a credit on a track names",
  targetPageType: "page-type/artist",
  types: "ts",
} as const satisfies RelationProperty
