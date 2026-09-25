import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason14 = {
  id: "01a06802-b8b8-7037-9cdf-a6b7f10de336",
  type: "page-type/season",
  slug: "criminal-minds-season-14",
  title: "Criminal Minds Season 14",
  partOfCollections: ["show/criminal-minds"],
  position: 14,
  ownLength: 630,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "14",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/14",
      lastSyncedAt: "2025-12-08",
    },
  ],
} as const satisfies Season
