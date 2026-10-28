import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const shugoChara = {
  id: "01a183d9-d698-75b7-990b-b373e9e8bb0f",
  type: "page-type/show",
  slug: "shugo-chara",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/shugo-chara"],
  publishedAt: "2007-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "14451", externalLink: "https://www.themoviedb.org/tv/14451" },
  ],
  title: "Shugo Chara!",
  createdAt: "2026-10-28T18:50:53.965Z",
  updatedAt: "2026-10-28T18:50:53.965Z",
} as const satisfies Show
