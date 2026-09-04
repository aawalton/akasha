import type { Season } from "../season.page-type.ts"

export const friendsSeason2 = {
  id: "01a06802-b8ba-7005-af0f-cf70eccd6356",
  pageTypeSlug: "season",
  slug: "friends-season-2",
  title: "Friends Season 2",
  partOfSlugs: ["friends"],
  position: 2,
  ownLength: 550.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1995-09-22",
  externalId: "trakt-season-4976",
  externalLink: "https://trakt.tv/shows/friends/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
