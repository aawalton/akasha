import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blueySeason2 = {
  id: "01a06802-b8b8-700c-a257-a7dc8ed99bce",
  type: "page-type/season",
  slug: "bluey-season-2",
  title: "Bluey Season 2",
  partOfCollections: ["show/bluey"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-03-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-211122",
      externalLink: "https://trakt.tv/shows/bluey-2018/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Season
