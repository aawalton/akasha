import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const parksAndRecreationSeason6 = {
  id: "01a06802-b8bc-700c-91de-8f7d5e389f15",
  type: "page-type/season",
  slug: "parks-and-recreation-season-6",
  title: "Parks and Recreation Season 6",
  partOfCollections: ["show/parks-and-recreation"],
  position: 6,
  ownLength: 484.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-18969",
      externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
