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
  ],
} as const satisfies Show
