import type { Season } from "../season.page-type.ts"

export const friendsSeason3 = {
  id: "01a06802-b8ba-7006-8b1f-e3e93893ac83",
  pageTypeSlug: "season",
  slug: "friends-season-3",
  title: "Friends Season 3",
  partOfSlugs: ["friends"],
  position: 3,
  ownLength: 574.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1996-09-17",
  externalId: "trakt-season-4977",
  externalLink: "https://trakt.tv/shows/friends/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
