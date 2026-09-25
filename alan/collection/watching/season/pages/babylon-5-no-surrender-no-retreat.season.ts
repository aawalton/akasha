import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const babylon5NoSurrenderNoRetreat = {
  id: "01a06802-b8b7-7014-9a67-5c3842381817",
  type: "page-type/season",
  slug: "babylon-5-no-surrender-no-retreat",
  title: "Babylon 5 No Surrender, No Retreat",
  partOfCollections: ["show/babylon-5"],
  position: 4,
  ownLength: 990,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-11-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "4",
      externalLink: "https://trakt.tv/shows/babylon-5/seasons/4",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Season
