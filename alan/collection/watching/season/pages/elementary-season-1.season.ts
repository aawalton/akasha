import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const elementarySeason1 = {
  id: "01a06802-b8b9-7033-86c7-f72b928ae9b3",
  type: "page-type/season",
  slug: "elementary-season-1",
  title: "Elementary Season 1",
  partOfCollections: ["show/elementary"],
  position: 1,
  ownLength: 1035,
  ownProgress: 1035,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4058",
      externalLink: "https://trakt.tv/shows/elementary/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
