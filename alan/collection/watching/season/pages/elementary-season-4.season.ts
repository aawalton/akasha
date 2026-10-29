import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const elementarySeason4 = {
  id: "01a06802-b8b9-7036-94e3-205fd439093d",
  type: "page-type/season",
  slug: "elementary-season-4",
  title: "Elementary Season 4",
  partOfCollections: ["show/elementary"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-11-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-112130",
      externalLink: "https://trakt.tv/shows/elementary/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
  progressedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Season
