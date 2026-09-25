import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbyFairyTalesSpecials = {
  id: "01a06802-b8bc-7021-b467-2c43ce3897f2",
  type: "page-type/season",
  slug: "rwby-fairy-tales-specials",
  title: "RWBY: Fairy Tales Specials",
  partOfCollections: ["show/rwby-fairy-tales"],
  position: 0,
  ownLength: 1,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2021-10-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/rwby-fairy-tales/seasons/0",
      lastSyncedAt: "2025-10-13",
    },
  ],
} as const satisfies Season
