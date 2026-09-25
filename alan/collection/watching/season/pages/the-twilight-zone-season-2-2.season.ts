import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSeason22 = {
  id: "01a06802-b8bf-7043-9496-01899566f045",
  type: "page-type/season",
  slug: "the-twilight-zone-season-2-2",
  title: "The Twilight Zone Season 2",
  partOfCollections: ["show/the-twilight-zone-2019"],
  position: 2,
  ownLength: 392,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-06-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-2019/seasons/2",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Season
