import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const curiousCatererDyingForChocolate = {
  id: "01a1749a-66bd-7404-b618-f957c1c97a6a",
  type: "page-type/movie",
  slug: "curious-caterer-dying-for-chocolate",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-curious-caterer"],
  position: 1,
  publishedAt: "2022-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "936897",
      externalLink: "https://www.themoviedb.org/movie/936897",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Curious Caterer: Dying for Chocolate",
  genres: ["TV Movie", "Mystery", "Crime", "Drama", "Romance"],
  imdbId: "tt16968790",
  posterPath: "/7quPRcCVUmMBxKO58QwPuIADtYG.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
