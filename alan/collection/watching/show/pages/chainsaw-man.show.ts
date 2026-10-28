import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const chainsawMan = {
  id: "01a183d5-2788-70c4-aed1-b2a980de5e0a",
  type: "page-type/show",
  slug: "chainsaw-man",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/chainsaw-man"],
  publishedAt: "2022-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "114410", externalLink: "https://www.themoviedb.org/tv/114410" },
  ],
  title: "Chainsaw Man",
  createdAt: "2026-10-28T18:45:47.015Z",
  updatedAt: "2026-10-28T18:45:47.015Z",
} as const satisfies Show
