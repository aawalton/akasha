import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const parksAndRecreationSeason7 = {
  id: "01a06802-b8bc-700d-9216-01cb00061697",
  type: "page-type/season",
  slug: "parks-and-recreation-season-7",
  title: "Parks and Recreation Season 7",
  partOfCollections: ["show/parks-and-recreation"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-01-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-91156",
      externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Season
