import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const deadpoolAndWolverine = {
  id: "01a06802-6d99-7002-b74c-ffbabe0ef2c8",
  type: "page-type/movie",
  slug: "deadpool-and-wolverine",
  title: "Deadpool & Wolverine",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 50,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-07-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/deadpool-wolverine-2024",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
