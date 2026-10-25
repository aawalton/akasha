import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMostColorfulTimeOfTheYear = {
  id: "01a1749a-464e-7439-9856-e9cf9d843989",
  type: "page-type/movie",
  slug: "the-most-colorful-time-of-the-year",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028561",
      externalLink: "https://www.themoviedb.org/movie/1028561",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Most Colorful Time of the Year",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22207622",
  posterPath: "/qZq3hbnJ9ekOyauDmja3jhcAfxu.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
