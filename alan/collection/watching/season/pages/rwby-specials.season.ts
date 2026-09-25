import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbySpecials = {
  id: "01a06802-b8bc-7022-9757-906aef9eaa18",
  type: "page-type/season",
  slug: "rwby-specials",
  title: "RWBY Specials",
  partOfCollections: ["show/rwby-2"],
  position: 0,
  ownLength: 126,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2012-11-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/rwby/seasons/0",
      lastSyncedAt: "2026-01-16",
    },
  ],
} as const satisfies Season
