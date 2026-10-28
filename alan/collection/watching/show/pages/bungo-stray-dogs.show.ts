import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const bungoStrayDogs = {
  id: "01a183d8-d9d9-79ce-99e7-56184107cfc3",
  type: "page-type/show",
  slug: "bungo-stray-dogs",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/bungo-stray-dogs"],
  publishedAt: "2016-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "65931", externalLink: "https://www.themoviedb.org/tv/65931" },
  ],
  title: "Bungo Stray Dogs",
  createdAt: "2026-10-28T18:49:49.269Z",
  updatedAt: "2026-10-28T18:49:49.269Z",
} as const satisfies Show
