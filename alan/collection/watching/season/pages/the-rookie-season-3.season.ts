import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theRookieSeason3 = {
  id: "01a06802-b8bf-7031-8adf-996bc31e132d",
  type: "page-type/season",
  slug: "the-rookie-season-3",
  title: "The Rookie Season 3",
  partOfCollections: ["show/the-rookie"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-01-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-234425",
      externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
  progressedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Season
