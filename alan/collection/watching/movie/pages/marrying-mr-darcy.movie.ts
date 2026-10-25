import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const marryingMrDarcy = {
  id: "01a17499-c95e-7350-a9fc-4d56c5c36e3a",
  type: "page-type/movie",
  slug: "marrying-mr-darcy",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/mr-darcy"],
  position: 1,
  publishedAt: "2018-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "525452",
      externalLink: "https://www.themoviedb.org/movie/525452",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Marrying Mr. Darcy",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt8039362",
  posterPath: "/wQvrNB7XnC8rHP8tbHyiPCjEYqK.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
