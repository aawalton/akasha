import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const onThe12thDateOfChristmas = {
  id: "01a1749a-06be-79b4-be79-81ad9c2f1b2f",
  type: "page-type/movie",
  slug: "on-the-12th-date-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737778",
      externalLink: "https://www.themoviedb.org/movie/737778",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "On the 12th Date of Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt12822926",
  posterPath: "/piAaEyM0d18GW1R4Fjnqj4wIqwK.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
