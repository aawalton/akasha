import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbyVolume5 = {
  id: "01a06802-b8bc-7028-925d-c119f76806b1",
  type: "page-type/season",
  slug: "rwby-volume-5",
  title: "RWBY Volume 5",
  partOfCollections: ["show/rwby-2"],
  position: 5,
  ownLength: 241.2,
  ownProgress: 241.2,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2017-10-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/rwby/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
