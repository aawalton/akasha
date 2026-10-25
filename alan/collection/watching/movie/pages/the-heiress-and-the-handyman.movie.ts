import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theHeiressAndTheHandyman = {
  id: "01a1749a-89ab-742e-880f-816e2d09dddc",
  type: "page-type/movie",
  slug: "the-heiress-and-the-handyman",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-09-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1325851",
      externalLink: "https://www.themoviedb.org/movie/1325851",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Heiress and the Handyman",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt33115283",
  posterPath: "/3suOd3LPYpzUd4C1xEgN0Vvwdwf.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
