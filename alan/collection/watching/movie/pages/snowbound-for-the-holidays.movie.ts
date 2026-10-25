import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const snowboundForTheHolidays = {
  id: "01a1749a-c86b-7048-b064-add1884783cc",
  type: "page-type/movie",
  slug: "snowbound-for-the-holidays",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-07-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1570217",
      externalLink: "https://www.themoviedb.org/movie/1570217",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Snowbound for the Holidays",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt35287187",
  posterPath: "/gLgxHLAY88v0hHmQPkAdNZraDKu.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
