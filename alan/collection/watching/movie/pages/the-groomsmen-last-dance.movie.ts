import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGroomsmenLastDance = {
  id: "01a1749a-a94d-7dda-bcc9-056a7883a4a2",
  type: "page-type/movie",
  slug: "the-groomsmen-last-dance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-groomsmen"],
  position: 2,
  publishedAt: "2024-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1353959",
      externalLink: "https://www.themoviedb.org/movie/1353959",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Groomsmen: Last Dance",
  genres: ["TV Movie"],
  imdbId: "tt32915152",
  posterPath: "/kTYCe9lYj8FkR6YhRBxpQreoSag.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
