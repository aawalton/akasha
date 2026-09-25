import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ncisNewOrleans = {
  id: "01a06802-9332-700f-bd64-6fa7aa890cbe",
  type: "page-type/show",
  slug: "ncis-new-orleans",
  title: "NCIS: New Orleans",
  partOfCollections: ["show-collection/ncis-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ncis-new-orleans",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
