import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const blackClover = {
  id: "01a183da-1968-7e45-811b-43a7821cc8d7",
  type: "page-type/show",
  slug: "black-clover",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/black-clover"],
  publishedAt: "2017-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "73223", externalLink: "https://www.themoviedb.org/tv/73223" },
  ],
  title: "Black Clover",
  createdAt: "2026-10-28T18:51:11.067Z",
  updatedAt: "2026-10-28T18:51:11.067Z",
} as const satisfies Show
