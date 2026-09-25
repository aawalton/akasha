import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSeason12 = {
  id: "01a06802-b8bf-703f-a36e-bed33dd5f2e3",
  type: "page-type/season",
  slug: "the-twilight-zone-season-1-2",
  title: "The Twilight Zone Season 1",
  partOfCollections: ["show/the-twilight-zone-1985"],
  position: 1,
  ownLength: 1175,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1985-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/the-twilight-zone/seasons/1",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Season
