import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const stargateContinuum = {
  id: "01a06802-6d9a-7001-84b1-99481254bff9",
  type: "page-type/movie",
  slug: "stargate-continuum",
  title: "Stargate: Continuum",
  partOfCollections: ["fandom/stargate-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-07-29",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/stargate-continuum-2008",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
