import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myChristmasDream = {
  id: "01a17499-a7d6-736a-b777-73fece826b93",
  type: "page-type/movie",
  slug: "my-christmas-dream",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "415962",
      externalLink: "https://www.themoviedb.org/movie/415962",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Christmas Dream",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt5949946",
  posterPath: "/jCrE3Twc7PeLev4sCHkMtOPdrA5.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
