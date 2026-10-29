import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theRookieSeason5 = {
  id: "01a06802-b8bf-7033-a3c8-57645df3ba28",
  type: "page-type/season",
  slug: "the-rookie-season-5",
  title: "The Rookie Season 5",
  partOfCollections: ["show/the-rookie"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-297412",
      externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
  progressedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Season
