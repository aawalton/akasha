import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDiscoverySeason4 = {
  id: "01a06802-b8bc-7050-8977-b3d2186a102d",
  type: "page-type/season",
  slug: "star-trek-discovery-season-4",
  title: "Star Trek: Discovery Season 4",
  partOfCollections: ["show/star-trek-discovery"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Season
