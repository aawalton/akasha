import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripPussPussGirlsTrip = {
  id: "01a0aa7c-2176-7612-a0d6-7e5409f3e2b4",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-puss-puss-girls-trip",
  ownLength: 3.09535,
  ownProgress: 0,
  partOfCollections: [
    "release/zara-larsson-midnight-sun-girls-trip",
    "release/zara-larsson-puss-puss-girls-trip",
  ],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nYpEIZbqk9Pj3UCXbwtpM",
      externalLink: "https://open.spotify.com/track/2nYpEIZbqk9Pj3UCXbwtpM",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Puss Puss - Girls Trip",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "6UE7nl9mha6s8z0wFQFIZ2", artistName: "Robyn" },
  ],
  trackKey: "pusspussgirlstrip|1Xylc3o4UrD53lo9CvFvVg,6UE7nl9mha6s8z0wFQFIZ2|185721",
  song: "song/zara-larsson-puss-puss-girls-trip",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 1,
      position: 10,
      externalId: "2nYpEIZbqk9Pj3UCXbwtpM",
      externalLink: "https://open.spotify.com/track/2nYpEIZbqk9Pj3UCXbwtpM",
    },
    {
      release: "release/zara-larsson-puss-puss-girls-trip",
      discNumber: 1,
      position: 1,
      externalId: "6m5nsF5hPKUTxI2A2EJiLb",
      externalLink: "https://open.spotify.com/track/6m5nsF5hPKUTxI2A2EJiLb",
    },
  ],
} as const satisfies Track
