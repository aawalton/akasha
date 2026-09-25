import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const babylon5TheRoadHome = {
  id: "01a06802-6d98-700e-b413-3a1276634cde",
  type: "page-type/movie",
  slug: "babylon-5-the-road-home",
  title: "Babylon 5: The Road Home",
  partOfCollections: ["fandom/babylon-5-2"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-08-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "babylon-5-the-road-home-2023",
      externalLink: "https://trakt.tv/movies/babylon-5-the-road-home-2023",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Movie
