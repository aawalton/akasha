import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sherlockSeason3 = {
  id: "01a06802-b8bc-703b-ab02-6f4e5561c557",
  type: "page-type/season",
  slug: "sherlock-season-3",
  title: "Sherlock Season 3",
  partOfCollections: ["show/sherlock"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-01-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-30837",
      externalLink: "https://trakt.tv/shows/sherlock/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
  progressedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Season
