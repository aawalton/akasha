import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const severanceSpecials2 = {
  id: "01a06802-b8bc-7036-8827-bcf2575ba8b9",
  type: "page-type/season",
  slug: "severance-specials-2",
  title: "Severance Specials",
  partOfCollections: ["show/severance"],
  position: 0,
  ownLength: 7,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2021-12-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/severance/seasons/0",
      lastSyncedAt: "2025-12-03",
    },
  ],
} as const satisfies Season
