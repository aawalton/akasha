import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const artistName = {
  id: "01a06240-340f-7009-822f-aa230dee246e",
  type: "page-type/text-property",
  slug: "artist-name",
  propertySlug: "artist-name",
  definition: "the name Spotify gives an artist",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-02T13:12:49.935Z",
  updatedAt: "2026-09-16T13:54:50.000Z",
} as const satisfies TextProperty
