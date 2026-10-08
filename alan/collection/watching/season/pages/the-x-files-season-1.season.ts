import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason1 = {
  id: "01a06802-b8bf-7051-9647-6d69ec4a1e32",
  type: "page-type/season",
  slug: "the-x-files-season-1",
  title: "The X-Files Season 1",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 1,
  ownLength: 1098,
  ownProgress: 1098,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1993-09-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/1",
      lastSyncedAt: "2025-10-22",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
