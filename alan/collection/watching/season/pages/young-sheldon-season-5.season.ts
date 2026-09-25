import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const youngSheldonSeason5 = {
  id: "01a06802-b8c0-7026-91c3-73ede8380be6",
  type: "page-type/season",
  slug: "young-sheldon-season-5",
  title: "Young Sheldon Season 5",
  partOfCollections: ["show/young-sheldon"],
  position: 5,
  ownLength: 427.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-10-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-265164",
      externalLink: "https://trakt.tv/shows/young-sheldon/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
