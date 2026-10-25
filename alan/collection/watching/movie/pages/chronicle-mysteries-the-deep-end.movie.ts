import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chronicleMysteriesTheDeepEnd = {
  id: "01a1749a-06bb-78a0-b32b-b7701f80ccb4",
  type: "page-type/movie",
  slug: "chronicle-mysteries-the-deep-end",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/chronicle-mysteries"],
  position: 3,
  publishedAt: "2019-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "623922",
      externalLink: "https://www.themoviedb.org/movie/623922",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chronicle Mysteries: The Deep End",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt10790884",
  posterPath: "/gUUkmgY1jvRrdribqcjqK7oFQ7e.jpg",
  voteAverage: 7.8,
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
