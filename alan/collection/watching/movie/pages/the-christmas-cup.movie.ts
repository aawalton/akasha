import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasCup = {
  id: "01a1749a-a94d-7c67-b79d-df9bb7735a1b",
  type: "page-type/movie",
  slug: "the-christmas-cup",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547922",
      externalLink: "https://www.themoviedb.org/movie/1547922",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Cup",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt38354991",
  posterPath: "/3wTyiQUcaJKMniWqjf1nFqdVZGA.jpg",
  voteAverage: 5.2,
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
