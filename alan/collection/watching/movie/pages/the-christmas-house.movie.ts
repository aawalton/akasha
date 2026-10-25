import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasHouse = {
  id: "01a1749a-06bf-7caa-90ff-670324fb618e",
  type: "page-type/movie",
  slug: "the-christmas-house",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/the-christmas-house"],
  position: 0,
  publishedAt: "2020-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746042",
      externalLink: "https://www.themoviedb.org/movie/746042",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Christmas_House" },
  ],
  title: "The Christmas House",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt12950902",
  posterPath: "/4jDe1ExYjyCSpRNRpk9fFvh5SWC.jpg",
  voteAverage: 5.93,
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
