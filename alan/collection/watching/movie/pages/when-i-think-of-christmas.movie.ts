import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whenIThinkOfChristmas = {
  id: "01a1749a-464f-75bd-900c-355207b724d6",
  type: "page-type/movie",
  slug: "when-i-think-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028543",
      externalLink: "https://www.themoviedb.org/movie/1028543",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "When I Think of Christmas",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt22247502",
  posterPath: "/iKWVMaaHZqaOOqzgdKdpfqJk37B.jpg",
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
