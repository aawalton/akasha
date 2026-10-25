import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const roadhouseRomance = {
  id: "01a1749a-259c-7ea8-b20f-ebe4a6b7983d",
  type: "page-type/movie",
  slug: "roadhouse-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "842795",
      externalLink: "https://www.themoviedb.org/movie/842795",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Roadhouse Romance",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt8957414",
  posterPath: "/xGHgfijWsugNI2pK4qM3lIg5dbk.jpg",
  voteAverage: 7.1,
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
