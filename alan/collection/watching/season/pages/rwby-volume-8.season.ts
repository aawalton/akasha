import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbyVolume8 = {
  id: "01a06802-b8bc-702b-9d88-1058281c7d5b",
  type: "page-type/season",
  slug: "rwby-volume-8",
  title: "RWBY Volume 8",
  partOfCollections: ["show/rwby-2"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-11-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/rwby/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:40:16.337Z",
} as const satisfies Season
