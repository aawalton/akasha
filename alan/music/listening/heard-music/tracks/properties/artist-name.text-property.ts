import type { TextProperty } from "@akasha/pages-system/text-property"

export type ArtistName = string

export const artistName = {
  id: "01a06240-340f-7009-822f-aa230dee246e",
  pageTypeSlug: "text-property",
  slug: "artist-name",
  propertySlug: "artist-name",
  definition: "the name Spotify gives an artist",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An artist name is the first artist Spotify names for a track.",
    },
  ],
} as const satisfies TextProperty
