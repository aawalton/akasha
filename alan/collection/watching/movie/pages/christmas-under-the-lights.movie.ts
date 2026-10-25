import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasUnderTheLights = {
  id: "01a1749a-a949-7216-978c-d5a4fef70225",
  type: "page-type/movie",
  slug: "christmas-under-the-lights",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361248",
      externalLink: "https://www.themoviedb.org/movie/1361248",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Under the Lights",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt33253213",
  posterPath: "/cPlXjEJrqLxRU3GZyBwKgAFG8k5.jpg",
  voteAverage: 6.1,
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
