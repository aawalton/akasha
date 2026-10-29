import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const warehouse13 = {
  id: "01a06802-9333-700d-84e5-37530b01da74",
  type: "page-type/show",
  slug: "warehouse-13",
  title: "Warehouse 13",
  partOfCollections: ["show-collection/speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-07-08",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/warehouse-13",
      lastSyncedAt: "2025-10-13",
    },
    { source: "tmdb", externalId: "15819", externalLink: "https://www.themoviedb.org/tv/15819" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Show
