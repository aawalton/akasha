import type { Season } from "../season.page-type.ts"

export const theRookieSeason6 = {
  id: "01a06802-b8bf-7034-8d41-ea2ddd417009",
  pageTypeSlug: "season",
  slug: "the-rookie-season-6",
  title: "The Rookie Season 6",
  partOfSlugs: ["the-rookie"],
  position: 6,
  ownLength: 430.2,
  ownProgress: 430.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2024-02-21",
  externalId: "trakt-season-341274",
  externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
