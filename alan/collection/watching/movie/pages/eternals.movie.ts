import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const eternals = {
  id: "01a06802-6d99-700b-89b6-e4b87dc9ffa7",
  type: "page-type/movie",
  slug: "eternals",
  title: "Eternals",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 26,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-11-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/eternals-2021",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
