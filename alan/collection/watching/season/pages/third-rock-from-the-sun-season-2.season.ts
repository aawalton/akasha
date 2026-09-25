import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const thirdRockFromTheSunSeason2 = {
  id: "01a06802-b8b7-7001-bba0-1ee957c908d4",
  type: "page-type/season",
  slug: "third-rock-from-the-sun-season-2",
  title: "3rd Rock from the Sun Season 2",
  partOfCollections: ["show/third-rock-from-the-sun"],
  position: 2,
  ownLength: 572,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/3rd-rock-from-the-sun/seasons/2",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Season
