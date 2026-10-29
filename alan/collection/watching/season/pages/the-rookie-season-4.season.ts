import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theRookieSeason4 = {
  id: "01a06802-b8bf-7032-ab03-4be012a10da3",
  type: "page-type/season",
  slug: "the-rookie-season-4",
  title: "The Rookie Season 4",
  partOfCollections: ["show/the-rookie"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-264807",
      externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
  progressedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Season
