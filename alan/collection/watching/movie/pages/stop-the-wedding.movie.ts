import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const stopTheWedding = {
  id: "01a17499-a7d7-7904-a518-efa8296e08aa",
  type: "page-type/movie",
  slug: "stop-the-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-06-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "396393",
      externalLink: "https://www.themoviedb.org/movie/396393",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Stop_the_Wedding" },
  ],
  title: "Stop the Wedding!",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt5688480",
  posterPath: "/lRpXOyT9LRalrZTXliXyaPVwsqX.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
