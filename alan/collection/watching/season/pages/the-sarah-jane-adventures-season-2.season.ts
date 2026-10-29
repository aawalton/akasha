import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theSarahJaneAdventuresSeason2 = {
  id: "01a06802-b8bf-7037-8654-1251b1913a52",
  type: "page-type/season",
  slug: "the-sarah-jane-adventures-season-2",
  title: "The Sarah Jane Adventures Season 2",
  partOfCollections: ["show/the-sarah-jane-adventures"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-09-29",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-761",
      externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Season
