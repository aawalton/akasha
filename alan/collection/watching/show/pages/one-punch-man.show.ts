import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const onePunchMan = {
  id: "01a183d8-ba32-7a26-80f8-df385f09820a",
  type: "page-type/show",
  slug: "one-punch-man",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/one-punch-man"],
  publishedAt: "2015-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "63926", externalLink: "https://www.themoviedb.org/tv/63926" },
  ],
  title: "One-Punch Man",
  createdAt: "2026-10-28T18:49:41.167Z",
  updatedAt: "2026-10-28T18:49:41.167Z",
} as const satisfies Show
