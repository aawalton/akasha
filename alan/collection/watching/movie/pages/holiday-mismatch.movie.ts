import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayMismatch = {
  id: "01a1749a-89a9-7b3c-9ea1-5803801f73dc",
  type: "page-type/movie",
  slug: "holiday-mismatch",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1360782",
      externalLink: "https://www.themoviedb.org/movie/1360782",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Mismatch",
  genres: ["TV Movie", "Comedy", "Romance", "Family"],
  imdbId: "tt33481081",
  posterPath: "/jqFTEKY3Ry5Y9L4Pg5LGpVdNij5.jpg",
  voteAverage: 5.6,
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
