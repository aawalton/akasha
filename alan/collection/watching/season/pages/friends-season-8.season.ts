import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const friendsSeason8 = {
  id: "01a06802-b8ba-700b-aac6-e79b37cb71f8",
  type: "page-type/season",
  slug: "friends-season-8",
  title: "Friends Season 8",
  partOfCollections: ["show/friends"],
  position: 8,
  ownLength: 526.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2001-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4982",
      externalLink: "https://trakt.tv/shows/friends/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
