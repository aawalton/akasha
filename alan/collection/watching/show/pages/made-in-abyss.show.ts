import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const madeInAbyss = {
  id: "01a183dd-0709-7526-96d8-57e1d959b032",
  type: "page-type/show",
  slug: "made-in-abyss",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/made-in-abyss"],
  publishedAt: "2017-07-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "72636", externalLink: "https://www.themoviedb.org/tv/72636" },
  ],
  title: "Made in Abyss",
  createdAt: "2026-10-28T18:54:22.982Z",
  updatedAt: "2026-10-28T18:54:22.982Z",
} as const satisfies Show
