import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theMentalistSeason2 = {
  id: "01a06802-b8bf-701d-aa78-7d91726f120c",
  type: "page-type/season",
  slug: "the-mentalist-season-2",
  title: "The Mentalist Season 2",
  partOfCollections: ["show/the-mentalist"],
  position: 2,
  ownLength: 984,
  ownProgress: 984,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/the-mentalist/seasons/2",
      lastSyncedAt: "2026-01-01",
    },
  ],
} as const satisfies Season
