import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateInfinitySeason1 = {
  id: "01a06802-b8bd-704a-864d-9c54e3c82ef1",
  type: "page-type/season",
  slug: "stargate-infinity-season-1",
  title: "Stargate Infinity Season 1",
  partOfCollections: ["show/stargate-infinity"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-09-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-8620",
      externalLink: "https://trakt.tv/shows/stargate-infinity/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:43:28.750Z",
} as const satisfies Season
