import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ruriRocks = {
  id: "01a06802-9332-701b-8b42-fb7f4c81a3ac",
  type: "page-type/show",
  slug: "ruri-rocks",
  title: "Ruri Rocks",
  partOfCollections: ["show-collection/watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-07-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "ruri-rocks",
      externalLink: "https://trakt.tv/shows/ruri-rocks",
      lastSyncedAt: "2025-11-30",
    },
    { source: "tmdb", externalId: "271649", externalLink: "https://www.themoviedb.org/tv/271649" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:40:10.927Z",
} as const satisfies Show
