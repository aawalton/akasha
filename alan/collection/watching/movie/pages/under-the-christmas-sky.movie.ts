import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const underTheChristmasSky = {
  id: "01a1749a-66c2-7560-8bef-6f6ad26a50ba",
  type: "page-type/movie",
  slug: "under-the-christmas-sky",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180651",
      externalLink: "https://www.themoviedb.org/movie/1180651",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Under the Christmas Sky",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt29258080",
  posterPath: "/zTBMIZK2yg7wqWqEHb927mGNPZn.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
