import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oneRoyalHoliday = {
  id: "01a1749a-06be-789d-9bd7-9b02bc5970e3",
  type: "page-type/movie",
  slug: "one-royal-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737762",
      externalLink: "https://www.themoviedb.org/movie/737762",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One Royal Holiday",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt12773628",
  posterPath: "/qZMQ6Xp57sXZXzzYUuj4tYkU1MB.jpg",
  voteAverage: 6.723,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
