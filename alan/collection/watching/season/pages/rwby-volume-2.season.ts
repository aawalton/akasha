import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbyVolume2 = {
  id: "01a06802-b8bc-7025-9616-0c2e29811d5a",
  type: "page-type/season",
  slug: "rwby-volume-2",
  title: "RWBY Volume 2",
  partOfCollections: ["show/rwby-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2014-07-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/rwby/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:35:49.223Z",
  progressedAt: "2026-10-29T16:35:49.223Z",
} as const satisfies Season
