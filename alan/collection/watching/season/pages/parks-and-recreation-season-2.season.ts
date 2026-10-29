import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const parksAndRecreationSeason2 = {
  id: "01a06802-b8bc-7008-b807-da6c08b4832d",
  type: "page-type/season",
  slug: "parks-and-recreation-season-2",
  title: "Parks and Recreation Season 2",
  partOfCollections: ["show/parks-and-recreation"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-09-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-18965",
      externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Season
