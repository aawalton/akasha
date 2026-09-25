import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const crusadeSpecials = {
  id: "01a06802-b8b8-7046-8068-e7142b1adfa0",
  type: "page-type/season",
  slug: "crusade-specials",
  title: "Crusade Specials",
  partOfCollections: ["show/crusade"],
  position: 0,
  ownLength: 21,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "1999-09-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/crusade/seasons/0",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Season
