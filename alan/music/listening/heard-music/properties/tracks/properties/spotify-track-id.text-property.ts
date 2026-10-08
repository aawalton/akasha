import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const spotifyTrackId = {
  id: "01a06240-340f-7007-82de-0827e2457e43",
  type: "page-type/text-property",
  slug: "spotify-track-id",
  propertySlug: "spotify-track-id",
  definition: "a track's Spotify id",
  maxLength: 22,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Spotify track id is 22 characters of letters and digits.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T13:12:49.935Z",
  updatedAt: "2026-09-22T13:46:41.000Z",
} as const satisfies TextProperty
