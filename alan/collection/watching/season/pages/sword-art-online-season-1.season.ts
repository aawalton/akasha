import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const swordArtOnlineSeason1 = {
  id: "01a06802-b8be-7032-9e15-2acf67ea490a",
  type: "page-type/season",
  slug: "sword-art-online-season-1",
  title: "Sword Art Online (Season 1)",
  partOfCollections: ["show-collection/sword-art-online-shows"],
  position: 1,
  ownLength: 601.2,
  ownProgress: 601.2,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2012-07-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/sword-art-online/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
