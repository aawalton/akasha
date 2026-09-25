import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const friendsSeason10 = {
  id: "01a06802-b8ba-7004-81d3-b1242db07c9f",
  type: "page-type/season",
  slug: "friends-season-10",
  title: "Friends Season 10",
  partOfCollections: ["show/friends"],
  position: 10,
  ownLength: 453,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4984",
      externalLink: "https://trakt.tv/shows/friends/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
