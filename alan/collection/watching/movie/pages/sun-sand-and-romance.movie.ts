import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sunSandAndRomance = {
  id: "01a17499-c95f-7438-a69d-d1bbd81a7f0c",
  type: "page-type/movie",
  slug: "sun-sand-and-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-08-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "469779",
      externalLink: "https://www.themoviedb.org/movie/469779",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sun, Sand, and Romance",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7064954",
  posterPath: "/yECsg5JvrLlZcfoDdfJe5WsSzS0.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
