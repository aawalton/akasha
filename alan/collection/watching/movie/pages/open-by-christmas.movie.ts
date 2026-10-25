import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const openByChristmas = {
  id: "01a1749a-259c-7dce-b9ad-d057fa662508",
  type: "page-type/movie",
  slug: "open-by-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874161",
      externalLink: "https://www.themoviedb.org/movie/874161",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Open by Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt15758400",
  posterPath: "/iAGrDr0EWqu8ZjCsIYSfuMH32SR.jpg",
  voteAverage: 6.2,
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
