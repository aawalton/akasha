import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const noragami = {
  id: "01a183d5-93f3-7ecb-8725-607037403b40",
  type: "page-type/show",
  slug: "noragami",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/noragami"],
  publishedAt: "2014-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "64710", externalLink: "https://www.themoviedb.org/tv/64710" },
  ],
  title: "Noragami",
  createdAt: "2026-10-28T18:46:14.769Z",
  updatedAt: "2026-10-28T18:46:14.769Z",
} as const satisfies Show
