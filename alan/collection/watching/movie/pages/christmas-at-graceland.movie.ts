import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtGraceland = {
  id: "01a17499-c95a-7cc1-91a5-4fe4d0bb39d8",
  type: "page-type/movie",
  slug: "christmas-at-graceland",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/at-graceland"],
  position: 1,
  publishedAt: "2018-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "535808",
      externalLink: "https://www.themoviedb.org/movie/535808",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at Graceland",
  genres: ["TV Movie", "Family", "Romance"],
  imdbId: "tt8694374",
  posterPath: "/1KhJ3cxhMbgsIudXpG0coqnftLn.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
