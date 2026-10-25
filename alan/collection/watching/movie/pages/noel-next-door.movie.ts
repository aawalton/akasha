import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const noelNextDoor = {
  id: "01a1749a-464c-7935-af10-594924620cb0",
  type: "page-type/movie",
  slug: "noel-next-door",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027329",
      externalLink: "https://www.themoviedb.org/movie/1027329",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Noel Next Door",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt22207602",
  posterPath: "/lwG3Avf6Vg19pX3zmm3GYOyo28Y.jpg",
  voteAverage: 7,
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
