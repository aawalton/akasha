import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const pumpkinPieWars = {
  id: "01a17499-a7d7-7536-b24a-66b3480cb29f",
  type: "page-type/movie",
  slug: "pumpkin-pie-wars",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "413440",
      externalLink: "https://www.themoviedb.org/movie/413440",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Pumpkin Pie Wars",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt6076802",
  posterPath: "/3Cf1XSafdv5t4reOV3FrVvi9PIb.jpg",
  voteAverage: 6.129,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
