import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const homeTurf = {
  id: "01a1749a-a94b-758e-94ea-b4030e94f1bf",
  type: "page-type/movie",
  slug: "home-turf",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1535924",
      externalLink: "https://www.themoviedb.org/movie/1535924",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Home Turf",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt36460974",
  posterPath: "/kWoHop8qf17VvAaDYzJfDhFil1F.jpg",
  voteAverage: 8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
