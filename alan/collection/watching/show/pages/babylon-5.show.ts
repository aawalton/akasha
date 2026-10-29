import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const babylon5 = {
  id: "01a06802-9331-7008-bb33-49c6381eabf6",
  type: "page-type/show",
  slug: "babylon-5",
  title: "Babylon 5",
  partOfCollections: ["fandom/babylon-5-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1994-01-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "babylon-5",
      externalLink: "https://trakt.tv/shows/babylon-5",
      lastSyncedAt: "2025-12-20",
    },
    { source: "tmdb", externalId: "3137", externalLink: "https://www.themoviedb.org/tv/3137" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Show
