import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasTown = {
  id: "01a1749a-06bb-7d96-8a2e-bc6d6ce0d7bc",
  type: "page-type/movie",
  slug: "christmas-town",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626318",
      externalLink: "https://www.themoviedb.org/movie/626318",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Town",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10344986",
  posterPath: "/jgot7PGO2RTU2AK9n3MFMvSGCW9.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
