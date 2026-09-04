import type { Season } from "../season.page-type.ts"

export const friendsSeason7 = {
  id: "01a06802-b8ba-700a-8bea-ebba5ddd5716",
  pageTypeSlug: "season",
  slug: "friends-season-7",
  title: "Friends Season 7",
  partOfSlugs: ["friends"],
  position: 7,
  ownLength: 526.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2000-10-13",
  externalId: "trakt-season-4981",
  externalLink: "https://trakt.tv/shows/friends/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
