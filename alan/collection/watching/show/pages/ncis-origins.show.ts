import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ncisOrigins = {
  id: "01a06802-9332-7010-8b0b-c351e681cc37",
  type: "page-type/show",
  slug: "ncis-origins",
  title: "NCIS: Origins",
  partOfCollections: ["show-collection/ncis-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-10-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ncis-origins",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
