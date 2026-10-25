import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allSummerLong = {
  id: "01a17499-e801-74d6-aacf-9894d7e8f7dc",
  type: "page-type/movie",
  slug: "all-summer-long",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-08-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "616808",
      externalLink: "https://www.themoviedb.org/movie/616808",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All Summer Long",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10720816",
  posterPath: "/cGPJZdCU9QCBdH9ZeUBZh3hWQqF.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
