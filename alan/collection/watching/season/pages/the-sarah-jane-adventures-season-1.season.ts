import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theSarahJaneAdventuresSeason1 = {
  id: "01a06802-b8bf-7036-8136-9718a21f5323",
  type: "page-type/season",
  slug: "the-sarah-jane-adventures-season-1",
  title: "The Sarah Jane Adventures Season 1",
  partOfCollections: ["show/the-sarah-jane-adventures"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-760",
      externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Season
