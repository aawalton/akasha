import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateUniverseSeason1 = {
  id: "01a06802-b8be-7007-a58d-24b13651fa05",
  type: "page-type/season",
  slug: "stargate-universe-season-1",
  title: "Stargate Universe Season 1",
  partOfCollections: ["show/stargate-universe"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-15504",
      externalLink: "https://trakt.tv/shows/stargate-universe/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:04.143Z",
} as const satisfies Season
