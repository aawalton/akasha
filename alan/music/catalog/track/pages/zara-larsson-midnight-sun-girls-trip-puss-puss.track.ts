import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripPussPuss = {
  id: "01a0aa7c-22c9-7d32-abff-d131c51a72b5",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-puss-puss",
  ownLength: 3.8019666666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1RDJPcDoF8yFiAEoehJmH4",
      externalLink: "https://open.spotify.com/track/1RDJPcDoF8yFiAEoehJmH4",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Puss Puss",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "pusspuss|1Xylc3o4UrD53lo9CvFvVg|228118",
  song: "song/zara-larsson-puss-puss",
} as const satisfies Track
