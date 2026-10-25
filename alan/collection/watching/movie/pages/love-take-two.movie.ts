import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveTakeTwo = {
  id: "01a17499-e804-78c0-95ab-0957bcb7a32f",
  type: "page-type/movie",
  slug: "love-take-two",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-06-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "603450",
      externalLink: "https://www.themoviedb.org/movie/603450",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love, Take Two",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10136902",
  posterPath: "/inQyZrtF7sFtsZ5hOUKIgiu4aik.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
