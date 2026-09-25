import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const shangChiAndTheLegendOfTheTenRings = {
  id: "01a06802-6d99-7032-aa50-43bf5c51bc9a",
  type: "page-type/movie",
  slug: "shang-chi-and-the-legend-of-the-ten-rings",
  title: "Shang-Chi and the Legend of the Ten Rings",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 25,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-09-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/shang-chi-and-the-legend-of-the-ten-rings-2021",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
