import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const stevenUniverse = {
  id: "01a06802-9332-703c-8150-160c00975384",
  type: "page-type/show",
  slug: "steven-universe",
  title: "Steven Universe",
  partOfCollections: ["show-collection/cultural-literacy"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-11-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/steven-universe",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "61175", externalLink: "https://www.themoviedb.org/tv/61175" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Show
