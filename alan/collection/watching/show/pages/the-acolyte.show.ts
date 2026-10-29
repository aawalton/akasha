import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theAcolyte = {
  id: "01a06802-9332-7041-914f-5b6bcd175b90",
  type: "page-type/show",
  slug: "the-acolyte",
  title: "The Acolyte",
  partOfCollections: ["fandom/star-wars-2"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-06-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-acolyte",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "114479", externalLink: "https://www.themoviedb.org/tv/114479" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:44:52.906Z",
} as const satisfies Show
