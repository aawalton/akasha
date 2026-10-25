import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sisterSwapChristmasInTheCity = {
  id: "01a1749a-464d-770d-94d7-806081ae6d94",
  type: "page-type/movie",
  slug: "sister-swap-christmas-in-the-city",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/sister-swap"],
  position: 1,
  publishedAt: "2021-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "866669",
      externalLink: "https://www.themoviedb.org/movie/866669",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sister Swap: Christmas in the City",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt6540724",
  posterPath: "/xIxSuBvx8tApounB5etdD5JGQvw.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
