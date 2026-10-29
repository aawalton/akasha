import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const parksAndRecreationSeason4 = {
  id: "01a06802-b8bc-700a-b988-cc23851aabb0",
  type: "page-type/season",
  slug: "parks-and-recreation-season-4",
  title: "Parks and Recreation Season 4",
  partOfCollections: ["show/parks-and-recreation"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-18967",
      externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Season
