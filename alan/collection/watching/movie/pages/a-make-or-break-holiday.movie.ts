import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMakeOrBreakHoliday = {
  id: "01a1749a-c867-79a8-ba19-d9cfd6a8246b",
  type: "page-type/movie",
  slug: "a-make-or-break-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-12-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547927",
      externalLink: "https://www.themoviedb.org/movie/1547927",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Make Or Break Holiday",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt38354998",
  posterPath: "/wU9b2M23p3QTsqY6aO051O9Th80.jpg",
  voteAverage: 7.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
