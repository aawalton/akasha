import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveBethelLive = {
  id: "01a0b4c8-57a3-7529-8b01-4ab17e8a0e9d",
  type: "page-type/track",
  slug: "paul-cardall-live-bethel-live",
  ownLength: 2.80555,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2d8F4yWixkIhXfmWKbwKP6",
      externalLink: "https://open.spotify.com/track/2d8F4yWixkIhXfmWKbwKP6",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Bethel - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bethellive|7FQRbf8gbKw8KZQZAJWxH2|168333",
  song: "song/paul-cardall-bethel",
} as const satisfies Track
