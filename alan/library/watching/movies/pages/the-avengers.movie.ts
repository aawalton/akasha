import type { Movie } from "../movie.page-type.types.ts"

export const theAvengers = {
  id: "01a06802-6d9a-7008-9965-9ade2c2f3ba7",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "the-avengers",
  title: "The Avengers",
  partOfCollections: ["marvel-cinematic-universe"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  publishedAt: "2012-05-04",
  externalLink: "https://trakt.tv/movies/the-avengers-2012",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
