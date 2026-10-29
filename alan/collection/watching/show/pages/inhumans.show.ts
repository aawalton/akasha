import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const inhumans = {
  id: "01a06802-9332-7002-a616-7758e81e4777",
  type: "page-type/show",
  slug: "inhumans",
  title: "Inhumans",
  partOfCollections: ["fandom/marvel-television"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-inhumans",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "276288", externalLink: "https://www.themoviedb.org/tv/276288" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Show
