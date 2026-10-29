import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const scorpionSeason4 = {
  id: "01a06802-b8bc-7030-b71d-cacb06f8ef39",
  type: "page-type/season",
  slug: "scorpion-season-4",
  title: "Scorpion Season 4",
  partOfCollections: ["show/scorpion"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-144261",
      externalLink: "https://trakt.tv/shows/scorpion/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
  progressedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Season
