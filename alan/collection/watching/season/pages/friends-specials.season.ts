import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const friendsSpecials = {
  id: "01a06802-b8ba-700d-9e15-01d5e3f3205c",
  type: "page-type/season",
  slug: "friends-specials",
  title: "Friends Specials",
  partOfCollections: ["show/friends"],
  position: 0,
  ownLength: 678,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2001-02-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4974",
      externalLink: "https://trakt.tv/shows/friends/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
