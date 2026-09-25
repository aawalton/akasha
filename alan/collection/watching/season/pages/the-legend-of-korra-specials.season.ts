import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theLegendOfKorraSpecials = {
  id: "01a06802-b8bf-7012-aaab-a9d459b046d1",
  type: "page-type/season",
  slug: "the-legend-of-korra-specials",
  title: "The Legend of Korra Specials",
  partOfCollections: ["show/the-legend-of-korra"],
  position: 0,
  ownLength: 358.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2013-08-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-45515",
      externalLink: "https://trakt.tv/shows/the-legend-of-korra/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
