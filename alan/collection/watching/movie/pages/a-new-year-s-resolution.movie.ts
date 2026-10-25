import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aNewYearSResolution = {
  id: "01a1749a-2598-7138-84cb-567a4415bb95",
  type: "page-type/movie",
  slug: "a-new-year-s-resolution",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630926",
      externalLink: "https://www.themoviedb.org/movie/630926",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A New Year's Resolution",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11363582",
  posterPath: "/l9l1v24dqbAlHdYHpt9T84zs17J.jpg",
  voteAverage: 6.314,
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
