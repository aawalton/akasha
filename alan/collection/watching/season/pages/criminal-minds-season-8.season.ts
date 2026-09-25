import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason8 = {
  id: "01a06802-b8b8-7042-a89e-1a3f50e638d1",
  type: "page-type/season",
  slug: "criminal-minds-season-8",
  title: "Criminal Minds Season 8",
  partOfCollections: ["show/criminal-minds"],
  position: 8,
  ownLength: 1008,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "8",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/8",
      lastSyncedAt: "2025-12-08",
    },
  ],
} as const satisfies Season
