import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason3 = {
  id: "01a06802-b8b8-703d-89ee-d0f4f7f2db8a",
  type: "page-type/season",
  slug: "criminal-minds-season-3",
  title: "Criminal Minds Season 3",
  partOfCollections: ["show/criminal-minds"],
  position: 3,
  ownLength: 827,
  ownProgress: 41.35,
  unit: "unit/minutes",
  status: "in-progress",
  publishedAt: "2007-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "3",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/3",
      lastSyncedAt: "2025-12-08",
    },
  ],
} as const satisfies Season
