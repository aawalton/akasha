import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason4 = {
  id: "01a06802-b8bf-7056-8b08-ee8e5fdf7a9b",
  type: "page-type/season",
  slug: "the-x-files-season-4",
  title: "The X-Files Season 4",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1996-10-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "4",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/4",
      lastSyncedAt: "2025-10-22",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:31:50.211Z",
  progressedAt: "2026-10-29T16:31:50.211Z",
} as const satisfies Season
