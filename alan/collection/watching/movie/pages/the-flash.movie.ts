import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theFlash = {
  id: "01a06802-6d9a-700b-85a7-4014f03333d0",
  type: "page-type/movie",
  slug: "the-flash",
  title: "The Flash",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-06-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-flash-2023",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
