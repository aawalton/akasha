import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const dragonBall = {
  id: "01a183db-f2a2-7fb6-9801-7bae309fbdf1",
  type: "page-type/show",
  slug: "dragon-ball",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/dragon-ball"],
  publishedAt: "1986-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "12609", externalLink: "https://www.themoviedb.org/tv/12609" },
  ],
  title: "Dragon Ball",
  createdAt: "2026-10-28T18:53:12.214Z",
  updatedAt: "2026-10-28T18:53:12.214Z",
} as const satisfies Show
