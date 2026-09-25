import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const friendsSeason9 = {
  id: "01a06802-b8ba-700c-83b6-a3d03f7be19c",
  type: "page-type/season",
  slug: "friends-season-9",
  title: "Friends Season 9",
  partOfCollections: ["show/friends"],
  position: 9,
  ownLength: 589.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4983",
      externalLink: "https://trakt.tv/shows/friends/seasons/9",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
