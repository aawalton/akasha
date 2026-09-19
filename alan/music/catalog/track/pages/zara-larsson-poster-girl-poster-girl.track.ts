import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlPosterGirl = {
  id: "01a0aa7c-30e6-76b9-b9c1-8e39b23c0fc0",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-poster-girl",
  ownLength: 2.9509,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1MGqtRnKlHNO4fuHMm2Dm9",
      externalLink: "https://open.spotify.com/track/1MGqtRnKlHNO4fuHMm2Dm9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Poster Girl",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "postergirl|1Xylc3o4UrD53lo9CvFvVg|177054",
  song: "song/zara-larsson-poster-girl",
} as const satisfies Track
