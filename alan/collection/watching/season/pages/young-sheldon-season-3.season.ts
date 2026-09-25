import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const youngSheldonSeason3 = {
  id: "01a06802-b8c0-7024-ab70-852055891395",
  type: "page-type/season",
  slug: "young-sheldon-season-3",
  title: "Young Sheldon Season 3",
  partOfCollections: ["show/young-sheldon"],
  position: 3,
  ownLength: 406.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-192713",
      externalLink: "https://trakt.tv/shows/young-sheldon/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
