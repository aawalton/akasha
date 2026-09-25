import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const numb3rsSeason4 = {
  id: "01a06802-b8bb-703f-9c4d-c77a45f5da9d",
  type: "page-type/season",
  slug: "numb3rs-season-4",
  title: "Numb3rs Season 4",
  partOfCollections: ["show/numb3rs"],
  position: 4,
  ownLength: 763.8,
  ownProgress: 763.8,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-09-29",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1956",
      externalLink: "https://trakt.tv/shows/numb3rs/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
