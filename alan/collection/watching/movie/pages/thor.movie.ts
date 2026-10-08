import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thor = {
  id: "01a06802-6d9a-7023-812d-245cb9f6bbb5",
  type: "page-type/movie",
  slug: "thor",
  title: "Thor",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-05-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/thor-2011",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
