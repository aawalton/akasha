import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodOneMississippi = {
  id: "01a0aa7c-3398-7a36-9978-6d954b9803bd",
  type: "page-type/track",
  slug: "zara-larsson-so-good-one-mississippi",
  ownLength: 3.132833333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7oArXBmMlLCtZdUkXWQZGs",
      externalLink: "https://open.spotify.com/track/7oArXBmMlLCtZdUkXWQZGs",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "One Mississippi",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "onemississippi|1Xylc3o4UrD53lo9CvFvVg|187970",
  song: "song/zara-larsson-one-mississippi",
} as const satisfies Track
