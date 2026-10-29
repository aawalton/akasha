import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const elementarySeason3 = {
  id: "01a06802-b8b9-7035-b3ea-93836f101935",
  type: "page-type/season",
  slug: "elementary-season-3",
  title: "Elementary Season 3",
  partOfCollections: ["show/elementary"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-10-31",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4060",
      externalLink: "https://trakt.tv/shows/elementary/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
  progressedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Season
