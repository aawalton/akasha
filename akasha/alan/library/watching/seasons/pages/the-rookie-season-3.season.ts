import type { Season } from "../season.page-type.ts"

export const theRookieSeason3 = {
  id: "01a06802-b8bf-7031-8adf-996bc31e132d",
  pageTypeSlug: "season",
  slug: "the-rookie-season-3",
  title: "The Rookie Season 3",
  partOfSlugs: ["the-rookie"],
  position: 3,
  ownLength: 601.8,
  ownProgress: 601.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-01-04",
  externalId: "trakt-season-234425",
  externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
