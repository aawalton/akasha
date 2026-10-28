import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const yourLieInApril = {
  id: "01a183d6-7158-79f2-8ad3-f8c9c20ed4ec",
  type: "page-type/show",
  slug: "your-lie-in-april",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/your-lie-in-april"],
  publishedAt: "2014-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "61663", externalLink: "https://www.themoviedb.org/tv/61663" },
  ],
  title: "Your Lie in April",
  createdAt: "2026-10-28T18:47:11.445Z",
  updatedAt: "2026-10-28T18:47:11.445Z",
} as const satisfies Show
