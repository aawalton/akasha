import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gravityFallsSeason1 = {
  id: "01a06802-b8ba-7020-a2d6-69249d6b6f79",
  type: "page-type/season",
  slug: "gravity-falls-season-1",
  title: "Gravity Falls Season 1",
  partOfCollections: ["show/gravity-falls"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-06-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-52097",
      externalLink: "https://trakt.tv/shows/gravity-falls/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Season
