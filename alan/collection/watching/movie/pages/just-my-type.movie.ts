import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const justMyType = {
  id: "01a1749a-06bd-7f02-928b-cacc2ca38454",
  type: "page-type/movie",
  slug: "just-my-type",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "676619",
      externalLink: "https://www.themoviedb.org/movie/676619",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Just My Type",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt11656836",
  posterPath: "/93cw0Sin2TxjOColXn0YeuFeaGQ.jpg",
  voteAverage: 6.75,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
