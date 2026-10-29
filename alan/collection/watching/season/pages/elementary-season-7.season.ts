import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const elementarySeason7 = {
  id: "01a06802-b8b9-7039-a810-c26637c0e4ae",
  type: "page-type/season",
  slug: "elementary-season-7",
  title: "Elementary Season 7",
  partOfCollections: ["show/elementary"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-05-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-183737",
      externalLink: "https://trakt.tv/shows/elementary/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
  progressedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Season
