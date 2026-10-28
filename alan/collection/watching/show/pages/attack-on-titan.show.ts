import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const attackOnTitan = {
  id: "01a183d1-6a29-7be5-aeed-3b92fb58ee48",
  type: "page-type/show",
  slug: "attack-on-titan",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/attack-on-titan"],
  publishedAt: "2013-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "1429", externalLink: "https://www.themoviedb.org/tv/1429" },
  ],
  title: "Attack on Titan",
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Show
