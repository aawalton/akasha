import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisLosAngelesSeason1 = {
  id: "01a06802-b8bb-700a-94d9-066861f47b5c",
  type: "page-type/season",
  slug: "ncis-los-angeles-season-1",
  title: "NCIS: Los Angeles Season 1",
  partOfCollections: ["show/ncis-los-angeles"],
  position: 1,
  ownLength: 1042.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-29185",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
