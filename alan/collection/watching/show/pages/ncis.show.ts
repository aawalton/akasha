import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ncis = {
  id: "01a06802-9332-700c-9fc5-1ad0b6727f03",
  type: "page-type/show",
  slug: "ncis",
  title: "NCIS",
  partOfCollections: ["show-collection/ncis-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-09-23",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/ncis", lastSyncedAt: "2025-10-01" },
    { source: "tmdb", externalId: "4614", externalLink: "https://www.themoviedb.org/tv/4614" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Show
