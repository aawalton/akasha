import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseRedeemer = {
  id: "01a0b4c8-5197-794a-afce-2058dbd1ee8c",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-redeemer",
  ownLength: 5.849333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6M5dOp0diloYCyZSYy99kf",
      externalLink: "https://open.spotify.com/track/6M5dOp0diloYCyZSYy99kf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Redeemer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "redeemer|7FQRbf8gbKw8KZQZAJWxH2|350960",
} as const satisfies Track
