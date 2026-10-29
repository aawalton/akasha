import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const parksAndRecreationSeason1 = {
  id: "01a06802-b8bc-7007-825d-4d01aa3e6254",
  type: "page-type/season",
  slug: "parks-and-recreation-season-1",
  title: "Parks and Recreation Season 1",
  partOfCollections: ["show/parks-and-recreation"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-04-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-18964",
      externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Season
