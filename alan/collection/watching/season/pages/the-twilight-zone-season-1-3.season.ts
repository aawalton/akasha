import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSeason13 = {
  id: "01a06802-b8bf-7040-8797-f99c959de682",
  type: "page-type/season",
  slug: "the-twilight-zone-season-1-3",
  title: "The Twilight Zone Season 1",
  partOfCollections: ["show/the-twilight-zone-2019"],
  position: 1,
  ownLength: 454,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-04-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-2019/seasons/1",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Season
