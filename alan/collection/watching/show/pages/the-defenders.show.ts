import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theDefenders = {
  id: "01a06802-9332-7045-8b44-b0f22d08a7a8",
  type: "page-type/show",
  slug: "the-defenders",
  title: "The Defenders",
  partOfCollections: ["fandom/marvel-television"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-08-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-the-defenders",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "11515", externalLink: "https://www.themoviedb.org/tv/11515" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Show
