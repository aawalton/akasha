import type { Season } from "../season.page-type.ts"

export const friendsSeason1 = {
  id: "01a06802-b8ba-7003-946b-e3dd07f6df21",
  pageTypeSlug: "season",
  slug: "friends-season-1",
  title: "Friends Season 1",
  partOfSlugs: ["friends"],
  position: 1,
  ownLength: 550.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1994-09-23",
  externalId: "trakt-season-4975",
  externalLink: "https://trakt.tv/shows/friends/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
