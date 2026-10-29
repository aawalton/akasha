import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const elementarySeason2 = {
  id: "01a06802-b8b9-7034-97a1-09d8b749ae21",
  type: "page-type/season",
  slug: "elementary-season-2",
  title: "Elementary Season 2",
  partOfCollections: ["show/elementary"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4059",
      externalLink: "https://trakt.tv/shows/elementary/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
  progressedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Season
