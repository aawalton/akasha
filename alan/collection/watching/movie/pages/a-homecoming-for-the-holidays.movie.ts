import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aHomecomingForTheHolidays = {
  id: "01a1749a-06b9-7e91-af0b-1f5e55dd16e4",
  type: "page-type/movie",
  slug: "a-homecoming-for-the-holidays",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630919",
      externalLink: "https://www.themoviedb.org/movie/630919",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Homecoming for the Holidays",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11193190",
  posterPath: "/2o438pqI1s9JIwlz61bkdma5aFO.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
