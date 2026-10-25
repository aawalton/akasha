import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const onePerfectWedding = {
  id: "01a1749a-259c-76ce-82fb-63b386be0dd5",
  type: "page-type/movie",
  slug: "one-perfect-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/one-winter"],
  position: 3,
  publishedAt: "2021-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "795982",
      externalLink: "https://www.themoviedb.org/movie/795982",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "One Perfect Wedding",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt10887358",
  posterPath: "/bqhml0SdBMHJ0VmpDGU73BQdA36.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T20:45:16.967Z",
} as const satisfies Movie
