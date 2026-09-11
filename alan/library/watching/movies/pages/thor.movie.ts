import type { Movie } from "akasha/alan/library/watching/movies/movie.page-type.types.ts"

export const thor = {
  id: "01a06802-6d9a-7023-812d-245cb9f6bbb5",
  type: "movie",
  slug: "thor",
  title: "Thor",
  partOfCollections: ["marvel-cinematic-universe"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  publishedAt: "2011-05-06",
  externalLink: "https://trakt.tv/movies/thor-2011",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
