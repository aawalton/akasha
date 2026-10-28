import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const bleach = {
  id: "01a183d3-f485-70dc-875a-a7b141174934",
  type: "page-type/show",
  slug: "bleach",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/bleach"],
  publishedAt: "2004-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "30984", externalLink: "https://www.themoviedb.org/tv/30984" },
  ],
  title: "Bleach",
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Show
