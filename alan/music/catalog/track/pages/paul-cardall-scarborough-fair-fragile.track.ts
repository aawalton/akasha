import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairFragile = {
  id: "01a0b4c8-6b59-79dc-9901-67d7945b0838",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-fragile",
  ownLength: 2.84125,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3x2nYN0AYbGx5PltryC96B",
      externalLink: "https://open.spotify.com/track/3x2nYN0AYbGx5PltryC96B",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Fragile",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "fragile|7FQRbf8gbKw8KZQZAJWxH2|170475",
  song: "song/paul-cardall-fragile",
} as const satisfies Track
