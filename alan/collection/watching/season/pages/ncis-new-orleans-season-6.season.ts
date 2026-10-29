import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisNewOrleansSeason6 = {
  id: "01a06802-b8bb-701e-93fb-c4cfd2366c55",
  type: "page-type/season",
  slug: "ncis-new-orleans-season-6",
  title: "NCIS: New Orleans Season 6",
  partOfCollections: ["show/ncis-new-orleans"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-192732",
      externalLink: "https://trakt.tv/shows/ncis-new-orleans/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Season
