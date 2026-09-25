import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sherlockSeason1 = {
  id: "01a06802-b8bc-7039-b43f-4a493333f962",
  type: "page-type/season",
  slug: "sherlock-season-1",
  title: "Sherlock Season 1",
  partOfCollections: ["show/sherlock"],
  position: 1,
  ownLength: 267,
  ownProgress: 267,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-07-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-30835",
      externalLink: "https://trakt.tv/shows/sherlock/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
