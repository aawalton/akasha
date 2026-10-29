import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason6 = {
  id: "01a06802-b8c0-7000-a58c-82979a32a3c5",
  type: "page-type/season",
  slug: "the-x-files-season-6",
  title: "The X-Files Season 6",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1998-11-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "6",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/6",
      lastSyncedAt: "2025-10-22",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-10-29T16:31:50.211Z",
  progressedAt: "2026-10-29T16:31:50.211Z",
} as const satisfies Season
