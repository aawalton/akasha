import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSpecials = {
  id: "01a06802-b8bf-7049-aa2f-1bd3e3bcce77",
  type: "page-type/season",
  slug: "the-twilight-zone-specials",
  title: "The Twilight Zone Specials",
  partOfCollections: ["show/the-twilight-zone-1959"],
  position: 0,
  ownLength: 4901,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "1958-11-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-1959/seasons/0",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Season
