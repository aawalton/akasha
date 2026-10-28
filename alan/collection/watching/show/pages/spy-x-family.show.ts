import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const spyXFamily = {
  id: "01a183d8-6440-7580-a343-8b1641ec7c4b",
  type: "page-type/show",
  slug: "spy-x-family",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/spy-x-family"],
  publishedAt: "2022-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "120089", externalLink: "https://www.themoviedb.org/tv/120089" },
  ],
  title: "SPY x FAMILY",
  createdAt: "2026-10-28T18:49:19.165Z",
  updatedAt: "2026-10-28T18:49:19.165Z",
} as const satisfies Show
