import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const elementarySeason6 = {
  id: "01a06802-b8b9-7038-82cf-802bcd500f23",
  type: "page-type/season",
  slug: "elementary-season-6",
  title: "Elementary Season 6",
  partOfCollections: ["show/elementary"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-05-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-147219",
      externalLink: "https://trakt.tv/shows/elementary/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
  progressedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Season
