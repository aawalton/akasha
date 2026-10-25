import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const picturePerfectMysteriesDeadOverDiamonds = {
  id: "01a1749a-259c-7a2c-9d65-1514f4fe6879",
  type: "page-type/movie",
  slug: "picture-perfect-mysteries-dead-over-diamonds",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["franchise/picture-perfect-mysteries"],
  position: 2,
  publishedAt: "2020-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "661328",
      externalLink: "https://www.themoviedb.org/movie/661328",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Picture Perfect Mysteries: Dead Over Diamonds",
  genres: ["TV Movie", "Crime", "Mystery"],
  imdbId: "tt10709020",
  posterPath: "/17V3Q36cB6vRgD6ulf9tWYakbcU.jpg",
  voteAverage: 7.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T20:45:16.967Z",
} as const satisfies Movie
