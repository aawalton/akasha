import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const dragonBallSuper = {
  id: "01a183dc-a499-7335-8369-90b7fb3d01b4",
  type: "page-type/show",
  slug: "dragon-ball-super",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/dragon-ball"],
  publishedAt: "2015-07-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "62715", externalLink: "https://www.themoviedb.org/tv/62715" },
  ],
  title: "Dragon Ball Super",
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Show
