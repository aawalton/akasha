import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbyVolume7 = {
  id: "01a06802-b8bc-702a-b919-d0f9b948de11",
  type: "page-type/season",
  slug: "rwby-volume-7",
  title: "RWBY Volume 7",
  partOfCollections: ["show/rwby-2"],
  position: 7,
  ownLength: 232.8,
  ownProgress: 232.8,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2019-11-02",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/rwby/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
