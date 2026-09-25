import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const youngSheldonSpecials = {
  id: "01a06802-b8c0-7029-8b87-07746f2f2cf5",
  type: "page-type/season",
  slug: "young-sheldon-specials",
  title: "Young Sheldon Specials",
  partOfCollections: ["show/young-sheldon"],
  position: 0,
  ownLength: 75,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2017-05-29",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-148590",
      externalLink: "https://trakt.tv/shows/young-sheldon/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
