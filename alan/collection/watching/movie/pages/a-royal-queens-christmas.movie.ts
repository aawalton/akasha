import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoyalQueensChristmas = {
  id: "01a1749a-4648-77f4-9334-29d789dc2cfd",
  type: "page-type/movie",
  slug: "a-royal-queens-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "888498",
      externalLink: "https://www.themoviedb.org/movie/888498",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Royal Queens Christmas",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15829734",
  posterPath: "/qB9f9iVxGuGZcGfxkE5xVfgQksU.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
