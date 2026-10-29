import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekDiscoverySeason5 = {
  id: "01a06802-b8bc-7051-a684-bd6992f50ef6",
  type: "page-type/season",
  slug: "star-trek-discovery-season-5",
  title: "Star Trek: Discovery Season 5",
  partOfCollections: ["show/star-trek-discovery"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-04-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Season
