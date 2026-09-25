import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aquamanAndTheLostKingdom = {
  id: "01a06802-6d98-7007-89cb-c3f07e0157af",
  type: "page-type/movie",
  slug: "aquaman-and-the-lost-kingdom",
  title: "Aquaman and the Lost Kingdom",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-12-22",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/aquaman-and-the-lost-kingdom-2023",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
