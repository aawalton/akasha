import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const kpopDemonHuntersMovie = {
  id: "01a06802-6d99-7023-9671-e081f4f31703",
  type: "page-type/movie",
  slug: "kpop-demon-hunters-movie",
  title: "KPop Demon Hunters Movie",
  partOfCollections: ["fandom/kpop-demon-hunters"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "S",
  publishedAt: "2025-06-20",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "kpop-demon-hunters-2025",
      externalLink: "https://app.trakt.tv/movies/kpop-demon-hunters-2025",
      lastSyncedAt: "2025-10-13",
    },
  ],
} as const satisfies Movie
