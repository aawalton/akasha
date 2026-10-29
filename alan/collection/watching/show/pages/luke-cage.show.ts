import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const lukeCage = {
  id: "01a06802-9332-7007-8220-a6c45b6077b0",
  type: "page-type/show",
  slug: "luke-cage",
  title: "Luke Cage",
  partOfCollections: ["fandom/marvel-television"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-luke-cage",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "62126", externalLink: "https://www.themoviedb.org/tv/62126" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:32:02.217Z",
} as const satisfies Show
