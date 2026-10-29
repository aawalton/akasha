import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sherlockSeason2 = {
  id: "01a06802-b8bc-703a-a41e-7fe1eeaee41c",
  type: "page-type/season",
  slug: "sherlock-season-2",
  title: "Sherlock Season 2",
  partOfCollections: ["show/sherlock"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-01-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-30836",
      externalLink: "https://trakt.tv/shows/sherlock/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
  progressedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Season
