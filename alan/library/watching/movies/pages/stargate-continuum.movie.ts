import type { Movie } from "../movie.page-type.types.ts"

export const stargateContinuum = {
  id: "01a06802-6d9a-7001-84b1-99481254bff9",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "stargate-continuum",
  title: "Stargate: Continuum",
  partOfCollections: ["stargate-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2008-07-29",
  externalLink: "https://trakt.tv/movies/stargate-continuum-2008",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
