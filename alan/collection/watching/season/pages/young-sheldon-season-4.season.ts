import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const youngSheldonSeason4 = {
  id: "01a06802-b8c0-7025-955c-a4ab2bead40d",
  type: "page-type/season",
  slug: "young-sheldon-season-4",
  title: "Young Sheldon Season 4",
  partOfCollections: ["show/young-sheldon"],
  position: 4,
  ownLength: 331.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-11-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-231277",
      externalLink: "https://trakt.tv/shows/young-sheldon/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
