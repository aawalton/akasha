import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason5 = {
  id: "01a06802-b8bf-7057-9ec0-a7d251ea418f",
  type: "page-type/season",
  slug: "the-x-files-season-5",
  title: "The X-Files Season 5",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1997-11-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "5",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/5",
      lastSyncedAt: "2025-10-22",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:31:50.211Z",
  progressedAt: "2026-10-29T16:31:50.211Z",
} as const satisfies Season
