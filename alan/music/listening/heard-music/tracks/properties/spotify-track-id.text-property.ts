import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const spotifyTrackId = {
  id: "01a06240-340f-7007-82de-0827e2457e43",
  type: "text-property",
  slug: "spotify-track-id",
  propertySlug: "spotify-track-id",
  definition: "the id Spotify keeps a track under",
  maxLength: 22,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Spotify track id is 22 characters of letters and digits.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
