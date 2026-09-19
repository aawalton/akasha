import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlSummerEditionLoveMeLand = {
  id: "01a0aa7c-2d32-7dae-95cb-a69c27b4f2ff",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-summer-edition-love-me-land",
  ownLength: 2.6719333333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl-summer-edition"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0y38hbZ7yGrwOilYoqOv8c",
      externalLink: "https://open.spotify.com/track/0y38hbZ7yGrwOilYoqOv8c",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Love Me Land",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "lovemeland|1Xylc3o4UrD53lo9CvFvVg|160316",
  song: "song/zara-larsson-love-me-land",
} as const satisfies Track
