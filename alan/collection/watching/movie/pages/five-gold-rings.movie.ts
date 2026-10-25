import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fiveGoldRings = {
  id: "01a1749a-a94a-74d2-b2d5-5e8036335516",
  type: "page-type/movie",
  slug: "five-gold-rings",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1360784",
      externalLink: "https://www.themoviedb.org/movie/1360784",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Five Gold Rings",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt32660209",
  posterPath: "/8CHIdcjVFwugBGeGSPYwLReTtwV.jpg",
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
