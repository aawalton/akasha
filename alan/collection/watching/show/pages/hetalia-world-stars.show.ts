import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const hetaliaWorldStars = {
  id: "01a183d7-8c16-7364-963c-8d7d08a034a1",
  type: "page-type/show",
  slug: "hetalia-world-stars",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/hetalia"],
  publishedAt: "2021-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "121301", externalLink: "https://www.themoviedb.org/tv/121301" },
  ],
  title: "Hetalia: World Stars",
  createdAt: "2026-10-28T18:48:23.830Z",
  updatedAt: "2026-10-28T18:48:23.830Z",
} as const satisfies Show
