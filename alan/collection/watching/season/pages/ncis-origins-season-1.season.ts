import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisOriginsSeason1 = {
  id: "01a06802-b8bb-7020-b3eb-72d84e1f1720",
  type: "page-type/season",
  slug: "ncis-origins-season-1",
  title: "NCIS: Origins Season 1",
  partOfCollections: ["show/ncis-origins"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-10-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-353238",
      externalLink: "https://trakt.tv/shows/ncis-origins/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Season
