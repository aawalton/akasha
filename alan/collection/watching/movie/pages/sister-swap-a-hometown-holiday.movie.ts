import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sisterSwapAHometownHoliday = {
  id: "01a1749a-259d-77e8-82f4-799f8543ffcc",
  type: "page-type/movie",
  slug: "sister-swap-a-hometown-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/sister-swap"],
  position: 0,
  publishedAt: "2021-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "866665",
      externalLink: "https://www.themoviedb.org/movie/866665",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sister Swap: A Hometown Holiday",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt6540706",
  posterPath: "/zb7fvRXVsDneU11NkTWE1suvX3h.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
