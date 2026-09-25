import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason2 = {
  id: "01a06802-b8b8-703c-bfc1-651d1def1dd4",
  type: "page-type/season",
  slug: "criminal-minds-season-2",
  title: "Criminal Minds Season 2",
  partOfCollections: ["show/criminal-minds"],
  position: 2,
  ownLength: 971,
  ownProgress: 971,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2006-09-20",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/2",
      lastSyncedAt: "2025-12-08",
    },
  ],
} as const satisfies Season
