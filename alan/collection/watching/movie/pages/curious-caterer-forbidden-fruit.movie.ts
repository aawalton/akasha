import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const curiousCatererForbiddenFruit = {
  id: "01a1749a-a949-7f1f-952d-720f5606467b",
  type: "page-type/movie",
  slug: "curious-caterer-forbidden-fruit",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-curious-caterer"],
  position: 4,
  publishedAt: "2024-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1342268",
      externalLink: "https://www.themoviedb.org/movie/1342268",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Curious Caterer: Forbidden Fruit",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt32992598",
  posterPath: "/g0ggQ1hWvMsJTMPCkBCH0fojh1Q.jpg",
  voteAverage: 7.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
