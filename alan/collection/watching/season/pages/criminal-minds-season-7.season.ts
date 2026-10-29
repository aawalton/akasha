import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason7 = {
  id: "01a06802-b8b8-7041-b47e-f76b1de63211",
  type: "page-type/season",
  slug: "criminal-minds-season-7",
  title: "Criminal Minds Season 7",
  partOfCollections: ["show/criminal-minds"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "7",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/7",
      lastSyncedAt: "2025-12-08",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Season
