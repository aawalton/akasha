import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayHotline = {
  id: "01a1749a-66be-7fda-93f5-ab8b15e10df9",
  type: "page-type/movie",
  slug: "holiday-hotline",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180811",
      externalLink: "https://www.themoviedb.org/movie/1180811",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday Hotline",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt29499210",
  posterPath: "/8kPrCp4N4wvT0KY4Eht3kxpSS6B.jpg",
  voteAverage: 6.8,
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
