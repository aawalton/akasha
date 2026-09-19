import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonWowWow = {
  id: "01a0aa7c-3ed6-76ae-a5f1-dd09afcf567e",
  type: "page-type/track",
  slug: "zara-larsson-wow-wow",
  ownLength: 2.9945833333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-wow"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3O8b0dDy1Z8BNM81U8DE1j",
      externalLink: "https://open.spotify.com/track/3O8b0dDy1Z8BNM81U8DE1j",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "WOW",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "wow|1Xylc3o4UrD53lo9CvFvVg|179675",
  song: "song/zara-larsson-wow",
} as const satisfies Track
