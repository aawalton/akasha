import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const happyHowlidays = {
  id: "01a1749a-a94a-7f85-b497-e55c60812795",
  type: "page-type/movie",
  slug: "happy-howlidays",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361232",
      externalLink: "https://www.themoviedb.org/movie/1361232",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Happy Howlidays",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33908123",
  posterPath: "/c8XMz6oRI7RboHacGcS0s0jxdgy.jpg",
  voteAverage: 5.429,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
