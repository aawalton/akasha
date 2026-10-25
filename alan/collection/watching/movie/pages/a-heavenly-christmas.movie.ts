import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aHeavenlyChristmas = {
  id: "01a17499-a7d2-7a00-b499-09cdc62be2b7",
  type: "page-type/movie",
  slug: "a-heavenly-christmas",
  ownLength: 93,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421760",
      externalLink: "https://www.themoviedb.org/movie/421760",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Heavenly Christmas",
  genres: ["Drama", "Romance", "Fantasy", "TV Movie"],
  imdbId: "tt6263260",
  posterPath: "/tFXXlWKUaD1CRC4g2lpaBYJTkl.jpg",
  voteAverage: 6.085,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
