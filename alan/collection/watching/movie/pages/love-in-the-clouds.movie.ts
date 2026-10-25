import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInTheClouds = {
  id: "01a1749a-a94b-7ee2-994c-ff50b9293f5d",
  type: "page-type/movie",
  slug: "love-in-the-clouds",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1458211",
      externalLink: "https://www.themoviedb.org/movie/1458211",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in the Clouds",
  genres: ["Romance"],
  imdbId: "tt35066995",
  posterPath: "/7w1GZu2EhdYflh3Pmbs4c7TvYxZ.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
