import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const runaways = {
  id: "01a06802-9332-701a-896c-0975c653b0e6",
  type: "page-type/show",
  slug: "runaways",
  title: "Runaways",
  partOfCollections: ["fandom/marvel-television"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-11-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-runaways",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "67466", externalLink: "https://www.themoviedb.org/tv/67466" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:40:06.602Z",
} as const satisfies Show
