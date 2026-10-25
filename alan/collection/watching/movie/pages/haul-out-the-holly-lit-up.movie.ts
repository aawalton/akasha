import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const haulOutTheHollyLitUp = {
  id: "01a1749a-66be-7fcb-9f0f-9482682f0eec",
  type: "page-type/movie",
  slug: "haul-out-the-holly-lit-up",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/haul-out-the-holly"],
  position: 1,
  publishedAt: "2023-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1154268",
      externalLink: "https://www.themoviedb.org/movie/1154268",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Haul Out the Holly: Lit Up",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28492358",
  posterPath: "/wDkGpq2lSd988vOdbcnfQU74lZS.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
