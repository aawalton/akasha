import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const creditedArtist = {
  id: "01a0d4f9-4338-7000-869a-7e463ee6c4a0",
  type: "page-type/relation-property",
  slug: "credited-artist",
  propertySlug: "artist",
  definition: "the artist page a credit on a track names",
  targetPageType: "page-type/artist",
  types: "ts",
  createdAt: "2026-09-24T19:51:40.600Z",
  updatedAt: "2026-09-24T19:51:56.000Z",
} as const satisfies RelationProperty
