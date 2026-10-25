import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aTailOfLove = {
  id: "01a1749a-4649-7c24-bf11-8b7fc692e51e",
  type: "page-type/movie",
  slug: "a-tail-of-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877826",
      externalLink: "https://www.themoviedb.org/movie/877826",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Tail of Love",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt14058850",
  posterPath: "/eoJX65JIFNOx6O1ZUKgzFJHJI95.jpg",
  voteAverage: 6.674,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
