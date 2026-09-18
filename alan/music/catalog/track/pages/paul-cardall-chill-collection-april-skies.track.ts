import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionAprilSkies = {
  id: "01a0b4c8-44b4-74d8-80f5-0659bb494d19",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-april-skies",
  ownLength: 3.581383333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Z7iv9P7XkmJhIVldZnXfE",
      externalLink: "https://open.spotify.com/track/2Z7iv9P7XkmJhIVldZnXfE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "April Skies",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "aprilskies|7FQRbf8gbKw8KZQZAJWxH2|214883",
} as const satisfies Track
