import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGroomsmenFirstLook = {
  id: "01a1749a-a94d-7ffd-b310-b0431cc7a8e2",
  type: "page-type/movie",
  slug: "the-groomsmen-first-look",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/the-groomsmen"],
  position: 0,
  publishedAt: "2024-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1353957",
      externalLink: "https://www.themoviedb.org/movie/1353957",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Groomsmen: First Look",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt32915102",
  posterPath: "/lOrafN12lvHNOcIlcPqKIzh8JYw.jpg",
  voteAverage: 6.5,
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
