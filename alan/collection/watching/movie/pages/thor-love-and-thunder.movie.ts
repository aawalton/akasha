import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thorLoveAndThunder = {
  id: "01a06802-6d9a-7024-b762-c752d5d85c0d",
  type: "page-type/movie",
  slug: "thor-love-and-thunder",
  title: "Thor: Love and Thunder",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 36,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-07-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/thor-love-and-thunder-2022",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
