import type { Season } from "../season.page-type.ts"

export const friendsSeason10 = {
  id: "01a06802-b8ba-7004-81d3-b1242db07c9f",
  pageTypeSlug: "season",
  slug: "friends-season-10",
  title: "Friends Season 10",
  partOfSlugs: ["friends"],
  position: 10,
  ownLength: 453,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-09-26",
  externalId: "trakt-season-4984",
  externalLink: "https://trakt.tv/shows/friends/seasons/10",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
