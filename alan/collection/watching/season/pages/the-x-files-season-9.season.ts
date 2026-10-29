import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason9 = {
  id: "01a06802-b8c0-7003-80db-efbbbf23cf8b",
  type: "page-type/season",
  slug: "the-x-files-season-9",
  title: "The X-Files Season 9",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 9,
  ownLength: 0,
  ownProgress: 897,
  unit: "unit/minutes",
  status: "in-progress",
  publishedAt: "2001-11-12",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "9",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/9",
      lastSyncedAt: "2025-10-22",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T16:31:50.211Z",
} as const satisfies Season
