import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theRookieSeason1 = {
  id: "01a06802-b8bf-702f-98b2-005088315f65",
  type: "page-type/season",
  slug: "the-rookie-season-1",
  title: "The Rookie Season 1",
  partOfCollections: ["show/the-rookie"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-10-17",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-168535",
      externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
  progressedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Season
