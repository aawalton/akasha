import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMerryChristmasMatch = {
  id: "01a1749a-06b9-77ad-816e-325cb77bf2f5",
  type: "page-type/movie",
  slug: "a-merry-christmas-match",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "607217",
      externalLink: "https://www.themoviedb.org/movie/607217",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Merry Christmas Match",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt10433222",
  posterPath: "/a8jfnsl5NQO2vz9Ml3bqRVOrgae.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
