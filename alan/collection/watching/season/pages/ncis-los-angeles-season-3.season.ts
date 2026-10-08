import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisLosAngelesSeason3 = {
  id: "01a06802-b8bb-7011-8f55-a5334cb97c73",
  type: "page-type/season",
  slug: "ncis-los-angeles-season-3",
  title: "NCIS: Los Angeles Season 3",
  partOfCollections: ["show/ncis-los-angeles"],
  position: 3,
  ownLength: 1026,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-29187",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
