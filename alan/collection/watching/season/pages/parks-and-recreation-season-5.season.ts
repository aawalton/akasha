import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const parksAndRecreationSeason5 = {
  id: "01a06802-b8bc-700b-be48-3acfcdc8ef60",
  type: "page-type/season",
  slug: "parks-and-recreation-season-5",
  title: "Parks and Recreation Season 5",
  partOfCollections: ["show/parks-and-recreation"],
  position: 5,
  ownLength: 484.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-18968",
      externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
