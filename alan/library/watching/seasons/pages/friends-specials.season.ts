import type { Season } from "../season.page-type.types.ts"

export const friendsSpecials = {
  id: "01a06802-b8ba-700d-9e15-01d5e3f3205c",
  pageTypeSlug: "season",
  type: "season",
  slug: "friends-specials",
  title: "Friends Specials",
  partOfCollections: ["friends"],
  position: 0,
  ownLength: 678,
  ownProgress: 0,
  unit: "minutes",
  status: "archived",
  publishedAt: "2001-02-16",
  externalId: "trakt-season-4974",
  externalLink: "https://trakt.tv/shows/friends/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
