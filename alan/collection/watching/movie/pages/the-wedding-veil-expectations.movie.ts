import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingVeilExpectations = {
  id: "01a1749a-66c1-72df-a316-4e9d14429c9f",
  type: "page-type/movie",
  slug: "the-wedding-veil-expectations",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-veil"],
  position: 3,
  publishedAt: "2023-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1056735",
      externalLink: "https://www.themoviedb.org/movie/1056735",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Veil Expectations",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt25050004",
  posterPath: "/yLXwOSXGnFcTtIL5gKoWpTDfdfE.jpg",
  voteAverage: 7.1,
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
