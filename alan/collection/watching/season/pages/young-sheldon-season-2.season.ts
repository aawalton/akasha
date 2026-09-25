import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const youngSheldonSeason2 = {
  id: "01a06802-b8c0-7023-85eb-e78c37af1f15",
  type: "page-type/season",
  slug: "young-sheldon-season-2",
  title: "Young Sheldon Season 2",
  partOfCollections: ["show/young-sheldon"],
  position: 2,
  ownLength: 429,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-164062",
      externalLink: "https://trakt.tv/shows/young-sheldon/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
