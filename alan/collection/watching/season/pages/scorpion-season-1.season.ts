import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const scorpionSeason1 = {
  id: "01a06802-b8bc-702d-aea2-d0b53bb1dee9",
  type: "page-type/season",
  slug: "scorpion-season-1",
  title: "Scorpion Season 1",
  partOfCollections: ["show/scorpion"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-61514",
      externalLink: "https://trakt.tv/shows/scorpion/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
  progressedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Season
