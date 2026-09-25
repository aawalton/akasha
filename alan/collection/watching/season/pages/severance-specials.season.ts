import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const severanceSpecials = {
  id: "01a06802-b8bc-7035-9f57-c43fcae6a62d",
  type: "page-type/season",
  slug: "severance-specials",
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
      lastSyncedAt: "2026-01-03",
    },
  ],
} as const satisfies Season
