import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const the5YearChristmasParty = {
  id: "01a1749a-89ab-778d-8b80-e3f7fb0ef486",
  type: "page-type/movie",
  slug: "the-5-year-christmas-party",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359868",
      externalLink: "https://www.themoviedb.org/movie/1359868",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The 5-Year Christmas Party",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33503201",
  posterPath: "/ilGPxk7aZDf5F1jebuB6OzPDkwm.jpg",
  voteAverage: 5.1,
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
