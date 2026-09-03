import type { Season } from "../season.page-type.ts"

export const friendsSeason8 = {
  id: "01a06802-b8ba-700b-aac6-e79b37cb71f8",
  pageTypeSlug: "season",
  slug: "friends-season-8",
  title: "Friends Season 8",
  partOfSlugs: ["friends"],
  position: 8,
  ownLength: 526.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2001-09-28",
  externalId: "trakt-season-4982",
  externalLink: "https://trakt.tv/shows/friends/seasons/8",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
