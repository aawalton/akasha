import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const rwby2 = {
  id: "01a06802-9332-701c-b9ba-0b05d7b34b33",
  type: "page-type/show",
  slug: "rwby-2",
  title: "RWBY",
  partOfCollections: ["fandom/rwby"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "A",
  publishedAt: "2013-07-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "rwby",
      externalLink: "https://trakt.tv/shows/rwby",
      lastSyncedAt: "2026-01-16",
    },
    { source: "tmdb", externalId: "50137", externalLink: "https://www.themoviedb.org/tv/50137" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:40:16.337Z",
} as const satisfies Show
