import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const elementarySeason5 = {
  id: "01a06802-b8b9-7037-9dac-6b05a8fad5b6",
  type: "page-type/season",
  slug: "elementary-season-5",
  title: "Elementary Season 5",
  partOfCollections: ["show/elementary"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-127192",
      externalLink: "https://trakt.tv/shows/elementary/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
  progressedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Season
