import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const friendsSeason1 = {
  id: "01a06802-b8ba-7003-946b-e3dd07f6df21",
  type: "page-type/season",
  slug: "friends-season-1",
  title: "Friends Season 1",
  partOfCollections: ["show/friends"],
  position: 1,
  ownLength: 550.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1994-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4975",
      externalLink: "https://trakt.tv/shows/friends/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
