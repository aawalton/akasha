import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aLifelongLove = {
  id: "01a1749a-89a6-773e-8f0e-e4999f44d956",
  type: "page-type/movie",
  slug: "a-lifelong-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-07-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1135632",
      externalLink: "https://www.themoviedb.org/movie/1135632",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Lifelong Love",
  genres: ["TV Movie", "Romance", "Drama", "Mystery"],
  imdbId: "tt27560881",
  posterPath: "/bDLT4LNy56fGa9t2CN7zRcT6laA.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
