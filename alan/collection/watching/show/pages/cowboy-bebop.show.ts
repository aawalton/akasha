import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const cowboyBebop = {
  id: "01a183d6-d2bf-7e2e-91f0-630aaeed8d8c",
  type: "page-type/show",
  slug: "cowboy-bebop",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/cowboy-bebop"],
  publishedAt: "1998-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "30991", externalLink: "https://www.themoviedb.org/tv/30991" },
  ],
  title: "Cowboy Bebop",
  createdAt: "2026-10-28T18:47:36.381Z",
  updatedAt: "2026-10-28T18:47:36.381Z",
} as const satisfies Show
