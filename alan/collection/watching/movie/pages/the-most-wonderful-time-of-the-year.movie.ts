import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMostWonderfulTimeOfTheYear = {
  id: "01a17499-470e-74ca-b0b8-cac271780254",
  type: "page-type/movie",
  slug: "the-most-wonderful-time-of-the-year",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "35830",
      externalLink: "https://www.themoviedb.org/movie/35830",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Most_Wonderful_Time_of_the_Year_(2008_film)",
    },
  ],
  title: "The Most Wonderful Time of the Year",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt1327788",
  posterPath: "/dVDLByvtadEiUJZqjEfIqyXs68l.jpg",
  voteAverage: 6.403,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
