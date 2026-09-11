import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const artistName = {
  id: "01a06240-340f-7009-822f-aa230dee246e",
  type: "text-property",
  slug: "artist-name",
  propertySlug: "artist-name",
  definition: "the name Spotify gives an artist",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An artist name is the first artist Spotify names for a track.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
