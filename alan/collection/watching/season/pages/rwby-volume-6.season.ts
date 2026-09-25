import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbyVolume6 = {
  id: "01a06802-b8bc-7029-9332-0d64f288d04d",
  type: "page-type/season",
  slug: "rwby-volume-6",
  title: "RWBY Volume 6",
  partOfCollections: ["show/rwby-2"],
  position: 6,
  ownLength: 225,
  ownProgress: 225,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2018-10-27",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/rwby/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
