import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbyVolume3 = {
  id: "01a06802-b8bc-7026-9b7b-9bd205b5982b",
  type: "page-type/season",
  slug: "rwby-volume-3",
  title: "RWBY Volume 3",
  partOfCollections: ["show/rwby-2"],
  position: 3,
  ownLength: 192,
  ownProgress: 192,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2015-10-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/rwby/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
