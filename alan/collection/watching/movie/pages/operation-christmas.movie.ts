import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const operationChristmas = {
  id: "01a17499-a7d7-73c4-8241-0441059b9704",
  type: "page-type/movie",
  slug: "operation-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421631",
      externalLink: "https://www.themoviedb.org/movie/421631",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Operation Christmas",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt6269700",
  posterPath: "/ttF3r6VOJwQKgHDtiYWAKlbd7Pm.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
