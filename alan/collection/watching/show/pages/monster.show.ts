import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const monster = {
  id: "01a183d8-0269-7b82-9805-f5a844934a2c",
  type: "page-type/show",
  slug: "monster",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/monster"],
  publishedAt: "2004-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "30981", externalLink: "https://www.themoviedb.org/tv/30981" },
  ],
  title: "Monster",
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Show
