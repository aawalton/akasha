import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const curiousCatererFoiledPlans = {
  id: "01a1749a-a949-7641-b66b-15e6b208bc16",
  type: "page-type/movie",
  slug: "curious-caterer-foiled-plans",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["franchise/the-curious-caterer"],
  position: 3,
  publishedAt: "2024-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1255418",
      externalLink: "https://www.themoviedb.org/movie/1255418",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Curious Caterer: Foiled Plans",
  genres: ["TV Movie", "Crime", "Drama", "Mystery"],
  imdbId: "tt30796260",
  posterPath: "/buJJMj1NLVufwPaFu1ApFHQQdxh.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
