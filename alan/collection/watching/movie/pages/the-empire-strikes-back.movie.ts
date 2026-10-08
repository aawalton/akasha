import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theEmpireStrikesBack = {
  id: "01a06802-6d9a-7009-bb63-9e92fb5e64f7",
  type: "page-type/movie",
  slug: "the-empire-strikes-back",
  title: "The Empire Strikes Back",
  partOfCollections: ["fandom/star-wars-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1980-05-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-empire-strikes-back-1980",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
