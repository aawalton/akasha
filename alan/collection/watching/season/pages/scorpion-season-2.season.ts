import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const scorpionSeason2 = {
  id: "01a06802-b8bc-702e-804a-bec268efb7a7",
  type: "page-type/season",
  slug: "scorpion-season-2",
  title: "Scorpion Season 2",
  partOfCollections: ["show/scorpion"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-112178",
      externalLink: "https://trakt.tv/shows/scorpion/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
  progressedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Season
