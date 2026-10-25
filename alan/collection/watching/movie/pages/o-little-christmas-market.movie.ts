import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const oLittleChristmasMarket = {
  id: "01a1749a-c86a-73a3-b33e-69ac3dcc87f4",
  type: "page-type/movie",
  slug: "o-little-christmas-market",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1592343",
      externalLink: "https://www.themoviedb.org/movie/1592343",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "O Little Christmas Market",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt35048304",
  posterPath: "/vvzxrf3eCDJDCUJUDIimMTBAEax.jpg",
  voteAverage: 3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
