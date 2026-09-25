import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const swordArtOnlineIiSeason2 = {
  id: "01a06802-b8be-7031-9e12-f57cd56a3fee",
  type: "page-type/season",
  slug: "sword-art-online-ii-season-2",
  title: "Sword Art Online II (Season 2)",
  partOfCollections: ["show-collection/sword-art-online-shows"],
  position: 2,
  ownLength: 576,
  ownProgress: 576,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2014-07-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/sword-art-online/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
