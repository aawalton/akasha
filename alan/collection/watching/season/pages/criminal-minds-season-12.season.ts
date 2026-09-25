import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason12 = {
  id: "01a06802-b8b8-7035-b514-fd95c984436c",
  type: "page-type/season",
  slug: "criminal-minds-season-12",
  title: "Criminal Minds Season 12",
  partOfCollections: ["show/criminal-minds"],
  position: 12,
  ownLength: 924,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "12",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/12",
      lastSyncedAt: "2025-12-08",
    },
  ],
} as const satisfies Season
