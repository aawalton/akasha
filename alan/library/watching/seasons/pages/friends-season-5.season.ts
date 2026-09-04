import type { Season } from "../season.page-type.ts"

export const friendsSeason5 = {
  id: "01a06802-b8ba-7008-b31c-d7ace008d721",
  pageTypeSlug: "season",
  slug: "friends-season-5",
  title: "Friends Season 5",
  partOfSlugs: ["friends"],
  position: 5,
  ownLength: 529.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1998-09-25",
  externalId: "trakt-season-4979",
  externalLink: "https://trakt.tv/shows/friends/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
