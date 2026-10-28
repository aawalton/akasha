import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const vampireKnight = {
  id: "01a183d8-f259-74d3-9c7e-71737871dd32",
  type: "page-type/show",
  slug: "vampire-knight",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/vampire-knight"],
  publishedAt: "2008-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "17149", externalLink: "https://www.themoviedb.org/tv/17149" },
  ],
  title: "Vampire Knight",
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Show
