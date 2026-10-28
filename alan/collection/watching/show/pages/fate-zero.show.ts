import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const fateZero = {
  id: "01a183d9-38a0-7688-a987-f5cc1b4bc230",
  type: "page-type/show",
  slug: "fate-zero",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/fate"],
  publishedAt: "2011-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "45845", externalLink: "https://www.themoviedb.org/tv/45845" },
  ],
  title: "Fate/Zero",
  createdAt: "2026-10-28T18:50:13.534Z",
  updatedAt: "2026-10-28T18:50:13.534Z",
} as const satisfies Show
