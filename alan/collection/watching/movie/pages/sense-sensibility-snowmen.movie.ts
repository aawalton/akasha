import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const senseSensibilitySnowmen = {
  id: "01a1749a-06bf-7f65-b152-cbc1fd77b4e2",
  type: "page-type/movie",
  slug: "sense-sensibility-snowmen",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "627491",
      externalLink: "https://www.themoviedb.org/movie/627491",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sense, Sensibility & Snowmen",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10650610",
  posterPath: "/57WPZHvKzcPvzJn5Ar5DrYuH3QS.jpg",
  voteAverage: 6.755,
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
