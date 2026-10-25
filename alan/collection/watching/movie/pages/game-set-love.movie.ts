import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gameSetLove = {
  id: "01a1749a-464b-7eaf-93aa-5194df8f4a15",
  type: "page-type/movie",
  slug: "game-set-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-08-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1002371",
      externalLink: "https://www.themoviedb.org/movie/1002371",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Game, Set, Love",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt20116668",
  posterPath: "/qH19vKTw21NkpjUz2XeY8NXpDzJ.jpg",
  voteAverage: 6.2,
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
