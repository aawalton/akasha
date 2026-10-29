import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const jessicaJones = {
  id: "01a06802-9332-7005-bc03-be4d4adbd25f",
  type: "page-type/show",
  slug: "jessica-jones",
  title: "Jessica Jones",
  partOfCollections: ["fandom/marvel-television"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-11-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-jessica-jones",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "38472", externalLink: "https://www.themoviedb.org/tv/38472" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:31:47.755Z",
} as const satisfies Show
