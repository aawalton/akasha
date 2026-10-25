import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const raiseAGlassToLove = {
  id: "01a1749a-259c-73e4-9a47-778a360dde8c",
  type: "page-type/movie",
  slug: "raise-a-glass-to-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "858908",
      externalLink: "https://www.themoviedb.org/movie/858908",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Raise a Glass to Love",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt15209944",
  posterPath: "/4XThRPWJJh4aBjuULVwNN1zEgQx.jpg",
  voteAverage: 5.848,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Pluto TV",
    "VIX ",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
