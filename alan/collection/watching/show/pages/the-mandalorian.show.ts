import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theMandalorian = {
  id: "01a06802-9332-704c-8f8d-c57201f82d6a",
  type: "page-type/show",
  slug: "the-mandalorian",
  title: "The Mandalorian",
  partOfCollections: ["fandom/star-wars-2"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-11-12",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-mandalorian",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "82856", externalLink: "https://www.themoviedb.org/tv/82856" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Show
