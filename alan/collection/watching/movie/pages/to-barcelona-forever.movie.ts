import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const toBarcelonaForever = {
  id: "01a1749a-a94e-7cd2-a5e1-800aba2e0e4f",
  type: "page-type/movie",
  slug: "to-barcelona-forever",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/to-barcelona"],
  position: 1,
  publishedAt: "2025-06-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1474448",
      externalLink: "https://www.themoviedb.org/movie/1474448",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "To Barcelona, Forever",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt35775376",
  posterPath: "/77JOqndgcxQwmQb221fvLNbAHKl.jpg",
  voteAverage: 7,
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
