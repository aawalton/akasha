import type { Season } from "../season.page-type.ts"

export const theRookieSeason1 = {
  id: "01a06802-b8bf-702f-98b2-005088315f65",
  pageTypeSlug: "season",
  slug: "the-rookie-season-1",
  title: "The Rookie Season 1",
  partOfSlugs: ["the-rookie"],
  position: 1,
  ownLength: 853.8,
  ownProgress: 853.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2018-10-17",
  externalId: "trakt-season-168535",
  externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
