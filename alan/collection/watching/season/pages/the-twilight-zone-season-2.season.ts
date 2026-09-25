import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSeason2 = {
  id: "01a06802-b8bf-7042-ba04-5e2b15c08d52",
  type: "page-type/season",
  slug: "the-twilight-zone-season-2",
  title: "The Twilight Zone Season 2",
  partOfCollections: ["show/the-twilight-zone-1985"],
  position: 2,
  ownLength: 448,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1986-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/the-twilight-zone/seasons/2",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Season
