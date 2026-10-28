import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const hetalia = {
  id: "01a183d7-7ce8-79bf-a835-2323fdbe096e",
  type: "page-type/show",
  slug: "hetalia",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/hetalia"],
  publishedAt: "2009-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "35138", externalLink: "https://www.themoviedb.org/tv/35138" },
  ],
  title: "Hetalia",
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Show
