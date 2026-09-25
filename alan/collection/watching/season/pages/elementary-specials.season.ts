import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const elementarySpecials = {
  id: "01a06802-b8b9-703a-97ab-86670d253612",
  type: "page-type/season",
  slug: "elementary-specials",
  title: "Elementary Specials",
  partOfCollections: ["show/elementary"],
  position: 0,
  ownLength: 214.8,
  ownProgress: 214.8,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2015-09-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4057",
      externalLink: "https://trakt.tv/shows/elementary/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
