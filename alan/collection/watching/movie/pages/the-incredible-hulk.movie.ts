import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theIncredibleHulk = {
  id: "01a06802-6d9a-7014-b204-130db86e5202",
  type: "page-type/movie",
  slug: "the-incredible-hulk",
  title: "The Incredible Hulk",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-06-12",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-incredible-hulk-2008",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
