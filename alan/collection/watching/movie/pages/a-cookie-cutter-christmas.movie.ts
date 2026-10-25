import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCookieCutterChristmas = {
  id: "01a17499-8943-766d-8188-80c8c5977a46",
  type: "page-type/movie",
  slug: "a-cookie-cutter-christmas",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299578",
      externalLink: "https://www.themoviedb.org/movie/299578",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Cookie Cutter Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt4012254",
  posterPath: "/2RxFyWQqExYSyWsKrHqrOojIEm6.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Cineverse Amazon Channel",
    "Dove Amazon Channel",
    "Philo",
    "Runtime",
    "Tubi TV",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
