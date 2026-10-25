import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const winterSDream = {
  id: "01a17499-c960-7c0a-8d76-d0d6ebe6ee41",
  type: "page-type/movie",
  slug: "winter-s-dream",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "494963",
      externalLink: "https://www.themoviedb.org/movie/494963",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Winter's Dream",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7594384",
  posterPath: "/5lyDeHVx7J6g0C4ubTIsNfGoAEV.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
