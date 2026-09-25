import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const severanceSeason1 = {
  id: "01a06802-b8bc-7033-b104-fd3e2c7e5500",
  type: "page-type/season",
  slug: "severance-season-1",
  title: "Severance Season 1",
  partOfCollections: ["show/severance"],
  position: 1,
  ownLength: 430.2,
  ownProgress: 430.2,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2022-02-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/severance/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
