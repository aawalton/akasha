import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ncisLosAngeles = {
  id: "01a06802-9332-700e-9310-84896c790548",
  type: "page-type/show",
  slug: "ncis-los-angeles",
  title: "NCIS: Los Angeles",
  partOfCollections: ["show-collection/ncis-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
