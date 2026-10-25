import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const engagingFatherChristmas = {
  id: "01a17499-c95c-7047-ac2b-7ad6c995b8ea",
  type: "page-type/movie",
  slug: "engaging-father-christmas",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/father-christmas"],
  position: 2,
  publishedAt: "2017-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "479607",
      externalLink: "https://www.themoviedb.org/movie/479607",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Engaging Father Christmas",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt6958760",
  posterPath: "/xiDQaS68IBFuMcFjstHF28ZOzxl.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
