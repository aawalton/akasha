import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsResistanceSpecials = {
  id: "01a06802-b8bd-7036-a320-d85ef8fac906",
  type: "page-type/season",
  slug: "star-wars-resistance-specials",
  title: "Star Wars Resistance Specials",
  partOfCollections: ["show/star-wars-resistance"],
  position: 0,
  ownLength: 16.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2018-12-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-177642",
      externalLink: "https://trakt.tv/shows/star-wars-resistance/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
