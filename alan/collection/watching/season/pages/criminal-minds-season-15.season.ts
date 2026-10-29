import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason15 = {
  id: "01a06802-b8b8-7038-829d-e672f2d0fd73",
  type: "page-type/season",
  slug: "criminal-minds-season-15",
  title: "Criminal Minds Season 15",
  partOfCollections: ["show/criminal-minds"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-01-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "15",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/15",
      lastSyncedAt: "2025-12-08",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Season
