import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theHolidayStocking = {
  id: "01a1749a-66c1-7950-a20a-5b70a398fb3c",
  type: "page-type/movie",
  slug: "the-holiday-stocking",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028545",
      externalLink: "https://www.themoviedb.org/movie/1028545",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Holiday Stocking",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22308008",
  posterPath: "/msCmQYDVSOF91o5ZogkDrrgvhee.jpg",
  voteAverage: 6.4,
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
