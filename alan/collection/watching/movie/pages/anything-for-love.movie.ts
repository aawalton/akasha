import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anythingForLove = {
  id: "01a17499-a7d3-721a-bb04-efc02aeaab33",
  type: "page-type/movie",
  slug: "anything-for-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "379990",
      externalLink: "https://www.themoviedb.org/movie/379990",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Anything for Love",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt5340362",
  posterPath: "/jvKECIiRF6qSp6LOXKfkuw1XpIO.jpg",
  voteAverage: 6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
