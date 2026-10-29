import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const scorpionSeason3 = {
  id: "01a06802-b8bc-702f-87e4-83c0c08b2f07",
  type: "page-type/season",
  slug: "scorpion-season-3",
  title: "Scorpion Season 3",
  partOfCollections: ["show/scorpion"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-10-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-128576",
      externalLink: "https://trakt.tv/shows/scorpion/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
  progressedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Season
