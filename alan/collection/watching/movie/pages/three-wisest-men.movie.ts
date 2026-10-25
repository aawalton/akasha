import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const threeWisestMen = {
  id: "01a1749a-a94e-7ef6-ab9d-763bff845536",
  type: "page-type/movie",
  slug: "three-wisest-men",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1537084",
      externalLink: "https://www.themoviedb.org/movie/1537084",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Three Wisest Men",
  genres: ["Romance", "Comedy", "Family", "TV Movie"],
  imdbId: "tt38353919",
  posterPath: "/yTMNjavrgr6BrYSb3BN7gRXPBcV.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
