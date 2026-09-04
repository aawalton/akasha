import type { Season } from "../season.page-type.ts"

export const friendsSeason4 = {
  id: "01a06802-b8ba-7007-8f39-f1010e8afbf0",
  pageTypeSlug: "season",
  slug: "friends-season-4",
  title: "Friends Season 4",
  partOfSlugs: ["friends"],
  position: 4,
  ownLength: 532.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1997-09-26",
  externalId: "trakt-season-4978",
  externalLink: "https://trakt.tv/shows/friends/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
