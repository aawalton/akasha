import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAtFirstDance = {
  id: "01a17499-c95d-779d-9db3-498472e75402",
  type: "page-type/movie",
  slug: "love-at-first-dance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "525456",
      externalLink: "https://www.themoviedb.org/movie/525456",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love at First Dance",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8430044",
  posterPath: "/1goWlaTrAdCjxkAk0dDvZijetCG.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
