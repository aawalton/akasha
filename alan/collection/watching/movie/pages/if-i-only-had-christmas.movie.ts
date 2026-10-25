import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ifIOnlyHadChristmas = {
  id: "01a1749a-06bc-7481-a399-be615166a99d",
  type: "page-type/movie",
  slug: "if-i-only-had-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737766",
      externalLink: "https://www.themoviedb.org/movie/737766",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "If I Only Had Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt12766346",
  posterPath: "/oJ465N1mV9FgYrsuph7ZxNtCJLn.jpg",
  voteAverage: 6.6,
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
