import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const believeInChristmas = {
  id: "01a1749a-89a7-7a3d-b48a-cd727221e7df",
  type: "page-type/movie",
  slug: "believe-in-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361215",
      externalLink: "https://www.themoviedb.org/movie/1361215",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Believe in Christmas",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt31987262",
  posterPath: "/sJklrstcV9xWTcVTK5SAiBIsfQW.jpg",
  voteAverage: 5.94,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
