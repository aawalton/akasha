import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const junjoRomantica = {
  id: "01a183d6-be6d-7825-8522-e9516885f351",
  type: "page-type/show",
  slug: "junjo-romantica",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/junjo-romantica"],
  publishedAt: "2008-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "37548", externalLink: "https://www.themoviedb.org/tv/37548" },
  ],
  title: "Junjo Romantica",
  createdAt: "2026-10-28T18:47:31.178Z",
  updatedAt: "2026-10-28T18:47:31.178Z",
} as const satisfies Show
