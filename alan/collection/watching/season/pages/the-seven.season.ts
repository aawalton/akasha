import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theSeven = {
  id: "01a06802-b8bf-703c-b9d2-bee9f8c2474e",
  type: "page-type/season",
  slug: "the-seven",
  title: "The Seven",
  partOfCollections: ["show/dimension-20"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-08-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-267049",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/11",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
