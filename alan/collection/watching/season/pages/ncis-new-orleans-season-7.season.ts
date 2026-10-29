import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisNewOrleansSeason7 = {
  id: "01a06802-b8bb-701f-a251-5d0b2a3757d8",
  type: "page-type/season",
  slug: "ncis-new-orleans-season-7",
  title: "NCIS: New Orleans Season 7",
  partOfCollections: ["show/ncis-new-orleans"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-11-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-231276",
      externalLink: "https://trakt.tv/shows/ncis-new-orleans/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Season
