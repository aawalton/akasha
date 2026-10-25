import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const catchMeIfYouClaus = {
  id: "01a1749a-66bc-7261-9f95-10084ff7f207",
  type: "page-type/movie",
  slug: "catch-me-if-you-claus",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180796",
      externalLink: "https://www.themoviedb.org/movie/1180796",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Catch Me If You Claus",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt29513295",
  posterPath: "/xdZZaEIYBKhnF72CQASdOC7QN3Z.jpg",
  voteAverage: 6.3,
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
