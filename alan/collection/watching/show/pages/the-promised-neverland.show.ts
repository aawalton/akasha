import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const thePromisedNeverland = {
  id: "01a183db-5604-7555-bf4f-cff2eb066972",
  type: "page-type/show",
  slug: "the-promised-neverland",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/the-promised-neverland"],
  publishedAt: "2019-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "83097", externalLink: "https://www.themoviedb.org/tv/83097" },
  ],
  title: "The Promised Neverland",
  createdAt: "2026-10-28T18:52:32.130Z",
  updatedAt: "2026-10-28T18:52:32.130Z",
} as const satisfies Show
