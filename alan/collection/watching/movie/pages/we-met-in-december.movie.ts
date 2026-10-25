import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weMetInDecember = {
  id: "01a1749a-a94e-7445-87e7-69f8a56d67ab",
  type: "page-type/movie",
  slug: "we-met-in-december",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547918",
      externalLink: "https://www.themoviedb.org/movie/1547918",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "We Met in December",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt38354934",
  posterPath: "/wJfUBJXLDBkDzLvFTj8hKqF6Xy3.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
