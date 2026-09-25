import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const scorpionSpecials = {
  id: "01a06802-b8bc-7031-80d9-2c4854f5c941",
  type: "page-type/season",
  slug: "scorpion-specials",
  title: "Scorpion Specials",
  partOfCollections: ["show/scorpion"],
  position: 0,
  ownLength: 49.8,
  ownProgress: 49.8,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2014-08-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-96845",
      externalLink: "https://trakt.tv/shows/scorpion/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
