import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const dragonBallZ = {
  id: "01a183dc-5623-72eb-9d11-efb197b905ef",
  type: "page-type/show",
  slug: "dragon-ball-z",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/dragon-ball"],
  publishedAt: "1989-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "12971", externalLink: "https://www.themoviedb.org/tv/12971" },
  ],
  title: "Dragon Ball Z",
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Show
