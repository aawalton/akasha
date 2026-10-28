import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const fruitsBasket = {
  id: "01a183d3-70aa-746b-8e78-5042d4895170",
  type: "page-type/show",
  slug: "fruits-basket",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/fruits-basket"],
  publishedAt: "2019-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "85991", externalLink: "https://www.themoviedb.org/tv/85991" },
  ],
  title: "Fruits Basket",
  createdAt: "2026-10-28T18:43:54.662Z",
  updatedAt: "2026-10-28T18:43:54.662Z",
} as const satisfies Show
