import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const creditedArtist = {
  id: "01a0d4f9-4338-7000-869a-7e463ee6c4a0",
  type: "page-type/relation-property",
  slug: "credited-artist",
  propertySlug: "artist",
  definition: "the page of an artist that Spotify shows for a track",
  targetPageType: "page-type/artist",
  types: "ts",
  createdAt: "2026-09-24T19:51:40.600Z",
  updatedAt: "2026-10-30T16:18:24.741Z",
} as const satisfies RelationProperty
