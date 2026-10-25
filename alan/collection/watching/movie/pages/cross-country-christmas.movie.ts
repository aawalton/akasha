import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const crossCountryChristmas = {
  id: "01a1749a-259a-742d-b7eb-03807a381345",
  type: "page-type/movie",
  slug: "cross-country-christmas",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737780",
      externalLink: "https://www.themoviedb.org/movie/737780",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Cross Country Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13040330",
  posterPath: "/lF5Bmfx8TZmDnNn8i7pSKA6zlEZ.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
