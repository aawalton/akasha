import type { Movie } from "../movie.page-type.ts"

export const stargateContinuum = {
  id: "01a06802-6d9a-7001-84b1-99481254bff9",
  pageTypeSlug: "movie",
  slug: "stargate-continuum",
  title: "Stargate: Continuum",
  partOfSlugs: ["stargate-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-07-29",
  externalLink: "https://trakt.tv/movies/stargate-continuum-2008",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
