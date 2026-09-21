import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonSymphonyFeatZaraLarsson = {
  id: "01a0676a-d72b-700a-82e6-010288c930b8",
  type: "page-type/release",
  slug: "zara-larsson-symphony-feat-zara-larsson",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2017-03-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4b13SJlne61y53KSEwuQtD",
      externalLink: "https://open.spotify.com/album/4b13SJlne61y53KSEwuQtD",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Symphony (feat. Zara Larsson)",
} as const satisfies Release
