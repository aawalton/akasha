import type { TextProperty } from "@akasha/pages-system/text-property"

export type SpotifyTrackId = string

export const spotifyTrackId = {
  id: "01a06240-340f-7007-82de-0827e2457e43",
  pageTypeSlug: "text-property",
  slug: "spotify-track-id",
  propertySlug: "spotify-track-id",
  definition: "the id Spotify keeps a track under",
  max: 22,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Spotify track id is 22 characters of letters and digits.",
    },
  ],
} as const satisfies TextProperty
