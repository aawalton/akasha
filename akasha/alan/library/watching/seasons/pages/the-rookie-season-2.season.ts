import type { Season } from "../season.page-type.ts"

export const theRookieSeason2 = {
  id: "01a06802-b8bf-7030-aafc-5c920a923906",
  pageTypeSlug: "season",
  slug: "the-rookie-season-2",
  title: "The Rookie Season 2",
  partOfSlugs: ["the-rookie"],
  position: 2,
  ownLength: 858,
  ownProgress: 858,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2019-09-30",
  externalId: "trakt-season-194138",
  externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
