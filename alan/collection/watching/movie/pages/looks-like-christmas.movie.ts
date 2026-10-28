import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const looksLikeChristmas = {
  id: "01a17499-a7d5-7c49-98c0-a8ac9ed53193",
  type: "page-type/movie",
  slug: "looks-like-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421622",
      externalLink: "https://www.themoviedb.org/movie/421622",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Looks Like Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt6217490",
  posterPath: "/mekjG3Ev970kJmmWRs7kYTxAvom.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
