import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theRookieSeason2 = {
  id: "01a06802-b8bf-7030-aafc-5c920a923906",
  type: "page-type/season",
  slug: "the-rookie-season-2",
  title: "The Rookie Season 2",
  partOfCollections: ["show/the-rookie"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-194138",
      externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
  progressedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Season
