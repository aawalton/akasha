import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const friendsSeason7 = {
  id: "01a06802-b8ba-700a-8bea-ebba5ddd5716",
  type: "page-type/season",
  slug: "friends-season-7",
  title: "Friends Season 7",
  partOfCollections: ["show/friends"],
  position: 7,
  ownLength: 526.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2000-10-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4981",
      externalLink: "https://trakt.tv/shows/friends/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
