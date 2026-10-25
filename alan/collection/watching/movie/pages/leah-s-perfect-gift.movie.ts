import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const leahSPerfectGift = {
  id: "01a1749a-89a9-7614-ba3a-e76638c47679",
  type: "page-type/movie",
  slug: "leah-s-perfect-gift",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361221",
      externalLink: "https://www.themoviedb.org/movie/1361221",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Leah's Perfect Gift",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33901924",
  posterPath: "/eYgHw9xIUqiYa1qIVX1M8QW8OUv.jpg",
  voteAverage: 6.417,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
