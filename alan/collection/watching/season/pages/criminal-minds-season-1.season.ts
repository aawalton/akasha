import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason1 = {
  id: "01a06802-b8b8-7032-84dd-35f7b7eecaaf",
  type: "page-type/season",
  slug: "criminal-minds-season-1",
  title: "Criminal Minds Season 1",
  partOfCollections: ["show/criminal-minds"],
  position: 1,
  ownLength: 914,
  ownProgress: 914,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/1",
      lastSyncedAt: "2025-12-08",
    },
  ],
} as const satisfies Season
