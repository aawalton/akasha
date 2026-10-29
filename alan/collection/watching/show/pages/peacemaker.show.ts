import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const peacemaker = {
  id: "01a06802-9332-7015-b90c-cf51ff16fd9c",
  type: "page-type/show",
  slug: "peacemaker",
  title: "Peacemaker",
  partOfCollections: ["fandom/dc-universe"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-10-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/peacemaker",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "110492", externalLink: "https://www.themoviedb.org/tv/110492" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:39:36.852Z",
} as const satisfies Show
