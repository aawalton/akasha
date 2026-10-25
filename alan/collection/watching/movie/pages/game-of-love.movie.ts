import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gameOfLove = {
  id: "01a1749a-66bd-7c6f-8f5c-50d09c9d3f9d",
  type: "page-type/movie",
  slug: "game-of-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1077902",
      externalLink: "https://www.themoviedb.org/movie/1077902",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Game of Love",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt23464604",
  posterPath: "/2wcgmtqp0wdPJiCYJfgFyovWI3h.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
