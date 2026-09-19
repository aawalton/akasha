import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsWesternWinds = {
  id: "01a0b4c8-1ef3-77cb-aa82-c8e309f3fd19",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-western-winds",
  ownLength: 3.7319,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2KOx9r201JBRvPTaWOwEQI",
      externalLink: "https://open.spotify.com/track/2KOx9r201JBRvPTaWOwEQI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Western Winds",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "westernwinds|7FQRbf8gbKw8KZQZAJWxH2|223914",
  song: "song/paul-cardall-western-winds",
} as const satisfies Track
