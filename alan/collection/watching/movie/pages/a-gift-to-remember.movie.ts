import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGiftToRemember = {
  id: "01a17499-c95a-7ad8-8c66-a05aa99589ca",
  type: "page-type/movie",
  slug: "a-gift-to-remember",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/a-gift-to-remember"],
  position: 0,
  publishedAt: "2017-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "480614",
      externalLink: "https://www.themoviedb.org/movie/480614",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Gift to Remember",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7006938",
  posterPath: "/l0XPQ2aOAEKpfuVF1Q56vzktlFC.jpg",
  voteAverage: 6,
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
