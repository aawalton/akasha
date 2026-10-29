import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason7 = {
  id: "01a06802-b8c0-7001-a949-ec339215b638",
  type: "page-type/season",
  slug: "the-x-files-season-7",
  title: "The X-Files Season 7",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1999-11-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "7",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/7",
      lastSyncedAt: "2025-10-22",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T16:31:50.211Z",
  progressedAt: "2026-10-29T16:31:50.211Z",
} as const satisfies Season
