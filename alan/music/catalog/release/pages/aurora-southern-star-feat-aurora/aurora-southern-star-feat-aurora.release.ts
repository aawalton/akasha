import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraSouthernStarFeatAurora = {
  id: "01a0676a-d729-7070-99e0-03070400ad48",
  type: "page-type/release",
  slug: "aurora-southern-star-feat-aurora",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2025-10-23",
  rank: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09ffeND0KDUNaU5UvzHioj",
      externalLink: "https://open.spotify.com/album/09ffeND0KDUNaU5UvzHioj",
      lastSyncedAt: "2025-10-30",
    },
  ],
  title: "Southern Star (feat. AURORA)",
} as const satisfies Release
