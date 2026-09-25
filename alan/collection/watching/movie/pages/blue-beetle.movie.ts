import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const blueBeetle = {
  id: "01a06802-6d98-701b-93ae-a8fe3f83ab91",
  type: "page-type/movie",
  slug: "blue-beetle",
  title: "Blue Beetle",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-08-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/blue-beetle-2023",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
