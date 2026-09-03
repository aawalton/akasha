import type { Season } from "../season.page-type.ts"

export const friendsSeason6 = {
  id: "01a06802-b8ba-7009-9c39-524118d5ceb1",
  pageTypeSlug: "season",
  slug: "friends-season-6",
  title: "Friends Season 6",
  partOfSlugs: ["friends"],
  position: 6,
  ownLength: 552,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1999-09-24",
  externalId: "trakt-season-4980",
  externalLink: "https://trakt.tv/shows/friends/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
