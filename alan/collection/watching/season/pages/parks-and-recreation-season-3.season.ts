import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const parksAndRecreationSeason3 = {
  id: "01a06802-b8bc-7009-bd2d-74820e3b9fd5",
  type: "page-type/season",
  slug: "parks-and-recreation-season-3",
  title: "Parks and Recreation Season 3",
  partOfCollections: ["show/parks-and-recreation"],
  position: 3,
  ownLength: 367.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-01-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-18966",
      externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
