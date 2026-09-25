import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const swordArtOnlineAlicizationSeason3 = {
  id: "01a06802-b8be-702c-8fe0-d6d2ae58f608",
  type: "page-type/season",
  slug: "sword-art-online-alicization-season-3",
  title: "Sword Art Online: Alicization (Season 3)",
  partOfCollections: ["show-collection/sword-art-online-shows"],
  position: 4,
  ownLength: 600,
  ownProgress: 600,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2018-10-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/sword-art-online/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
