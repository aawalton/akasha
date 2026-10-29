import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ironFist = {
  id: "01a06802-9332-7003-96d2-c9c78222e785",
  type: "page-type/show",
  slug: "iron-fist",
  title: "Iron Fist",
  partOfCollections: ["fandom/marvel-television"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-03-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-iron-fist",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "62127", externalLink: "https://www.themoviedb.org/tv/62127" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:31:39.349Z",
} as const satisfies Show
