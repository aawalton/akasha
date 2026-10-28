import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const gintama = {
  id: "01a183d6-3279-7258-a78d-7c4e9c9804eb",
  type: "page-type/show",
  slug: "gintama",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/gintama"],
  publishedAt: "2006-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "57041", externalLink: "https://www.themoviedb.org/tv/57041" },
  ],
  title: "Gintama",
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Show
