import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aquaman = {
  id: "01a06802-6d98-7006-a27f-42e531aae5d1",
  type: "page-type/movie",
  slug: "aquaman",
  title: "Aquaman",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-12-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/aquaman-2018",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
