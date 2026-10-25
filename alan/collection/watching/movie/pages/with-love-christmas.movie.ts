import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const withLoveChristmas = {
  id: "01a17499-c960-79bc-807f-cadc38f3141c",
  type: "page-type/movie",
  slug: "with-love-christmas",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474976",
      externalLink: "https://www.themoviedb.org/movie/474976",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "With Love, Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt7647000",
  posterPath: "/4nbTHrFz2hPH1TkG3K92UkYPKyW.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
