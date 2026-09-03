import type { Season } from "../season.page-type.ts"

export const theRookieSeason5 = {
  id: "01a06802-b8bf-7033-a3c8-57645df3ba28",
  pageTypeSlug: "season",
  slug: "the-rookie-season-5",
  title: "The Rookie Season 5",
  partOfSlugs: ["the-rookie"],
  position: 5,
  ownLength: 946.8,
  ownProgress: 946.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-09-26",
  externalId: "trakt-season-297412",
  externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
