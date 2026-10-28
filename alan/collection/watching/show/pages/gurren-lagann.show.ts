import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const gurrenLagann = {
  id: "01a183db-aaff-791b-9842-d2711862f1dc",
  type: "page-type/show",
  slug: "gurren-lagann",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/gurren-lagann"],
  publishedAt: "2007-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "21729", externalLink: "https://www.themoviedb.org/tv/21729" },
  ],
  title: "Gurren Lagann",
  createdAt: "2026-10-28T18:52:53.885Z",
  updatedAt: "2026-10-28T18:52:53.885Z",
} as const satisfies Show
