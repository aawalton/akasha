import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const sailorMoon = {
  id: "01a183d8-489c-7611-a7f3-8d1d608bfcdb",
  type: "page-type/show",
  slug: "sailor-moon",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/sailor-moon"],
  publishedAt: "1992-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "3570", externalLink: "https://www.themoviedb.org/tv/3570" },
  ],
  title: "Sailor Moon",
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Show
