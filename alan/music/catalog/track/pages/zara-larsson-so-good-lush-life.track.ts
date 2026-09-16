import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodLushLife = {
  id: "01a0aa7c-3242-7c77-a427-e64ba8f51acd",
  type: "page-type/track",
  slug: "zara-larsson-so-good-lush-life",
  ownLength: 3.3441,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1rIKgCH4H52lrvDcz50hS8",
      externalLink: "https://open.spotify.com/track/1rIKgCH4H52lrvDcz50hS8",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Lush Life",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "lushlife|1Xylc3o4UrD53lo9CvFvVg|200646",
} as const satisfies Track
