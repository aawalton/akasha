import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aVeryVeniceRomance = {
  id: "01a1749a-66bc-7a29-bd5c-cd86e41c03c6",
  type: "page-type/movie",
  slug: "a-very-venice-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1158696",
      externalLink: "https://www.themoviedb.org/movie/1158696",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Very Venice Romance",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt28524498",
  posterPath: "/sSGcRtrQrR3hJzM3a6tSYdq4Wqv.jpg",
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
