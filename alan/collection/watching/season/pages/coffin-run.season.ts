import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const coffinRun = {
  id: "01a06802-b8b8-7030-a766-b8b622bec340",
  type: "page-type/season",
  slug: "coffin-run",
  title: "Coffin Run",
  partOfCollections: ["show/dimension-20"],
  position: 14,
  ownLength: 618,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-06-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-297117",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/14",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
