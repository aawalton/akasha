import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodFuneral = {
  id: "01a0aa7c-33b7-7de6-adfe-4ede362829c6",
  type: "page-type/track",
  slug: "zara-larsson-so-good-funeral",
  ownLength: 3.594,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "75gU1E0ou9Kf8GBVwGs1Xk",
      externalLink: "https://open.spotify.com/track/75gU1E0ou9Kf8GBVwGs1Xk",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Funeral",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "funeral|1Xylc3o4UrD53lo9CvFvVg|215640",
} as const satisfies Track
