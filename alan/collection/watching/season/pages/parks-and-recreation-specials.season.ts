import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const parksAndRecreationSpecials = {
  id: "01a06802-b8bc-700e-a444-6d620a63050e",
  type: "page-type/season",
  slug: "parks-and-recreation-specials",
  title: "Parks and Recreation Specials",
  partOfCollections: ["show/parks-and-recreation"],
  position: 0,
  ownLength: 114,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2011-11-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-18963",
      externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
