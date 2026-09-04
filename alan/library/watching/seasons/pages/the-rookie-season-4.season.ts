import type { Season } from "../season.page-type.ts"

export const theRookieSeason4 = {
  id: "01a06802-b8bf-7032-ab03-4be012a10da3",
  pageTypeSlug: "season",
  slug: "the-rookie-season-4",
  title: "The Rookie Season 4",
  partOfSlugs: ["the-rookie"],
  position: 4,
  ownLength: 945,
  ownProgress: 945,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-09-27",
  externalId: "trakt-season-264807",
  externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
