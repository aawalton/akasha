import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const msMatched = {
  id: "01a17499-a7d6-7b31-8485-fd6a3200d354",
  type: "page-type/movie",
  slug: "ms-matched",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "393659",
      externalLink: "https://www.themoviedb.org/movie/393659",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ms. Matched",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt5692030",
  posterPath: "/xwHex77VTvabkOlZWjAn3zVs1jO.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
