import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const accelWorldSpecials = {
  id: "01a06802-b8b7-700b-931f-8459ce15672d",
  type: "page-type/season",
  slug: "accel-world-specials",
  title: "Accel World Specials",
  partOfCollections: ["show/accel-world-2"],
  position: 0,
  ownLength: 80,
  ownProgress: 80,
  unit: "unit/minutes",
  status: "archived",
  grade: "B",
  publishedAt: "2012-07-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/accel-world/seasons/0",
      lastSyncedAt: "2025-10-13",
    },
  ],
} as const satisfies Season
