import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sylviaDaleyTwinkleTwinkle = {
  id: "01a0a6c3-6b56-7c38-8540-cb193753264e",
  type: "page-type/release",
  slug: "sylvia-daley-twinkle-twinkle",
  ownLength: 2.4285666666666668,
  ownProgress: 0,
  partOfCollections: ["artist/sylvia-daley"],
  position: 0,
  publishedAt: "2026-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7immNZi29cQSqAHbmPKytW",
      externalLink: "https://open.spotify.com/album/7immNZi29cQSqAHbmPKytW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Twinkle Twinkle",
} as const satisfies Release
