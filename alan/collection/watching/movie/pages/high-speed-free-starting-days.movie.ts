import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const highSpeedFreeStartingDays = {
  id: "01a183d7-b9c4-74a0-9c7f-e2edda35db1c",
  type: "page-type/movie",
  slug: "high-speed-free-starting-days",
  ownLength: 110,
  ownProgress: 0,
  partOfCollections: ["fandom/free"],
  publishedAt: "2015-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "357416",
      externalLink: "https://www.themoviedb.org/movie/357416",
    },
  ],
  title: "High☆Speed!: Free! Starting Days",
  createdAt: "2026-10-28T18:48:35.523Z",
  updatedAt: "2026-10-28T18:48:35.523Z",
} as const satisfies Movie
