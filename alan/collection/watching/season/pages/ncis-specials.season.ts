import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSpecials = {
  id: "01a06802-b8bb-7037-9f59-3ce9ba4d21a8",
  type: "page-type/season",
  slug: "ncis-specials",
  title: "NCIS Specials",
  partOfCollections: ["show/ncis"],
  position: 0,
  ownLength: 765,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2007-04-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14539",
      externalLink: "https://trakt.tv/shows/ncis/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
