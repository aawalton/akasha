import type { Season } from "../season.page-type.ts"

export const theRookieSeason7 = {
  id: "01a06802-b8bf-7035-ad30-2f39d90ea69e",
  pageTypeSlug: "season",
  slug: "the-rookie-season-7",
  title: "The Rookie Season 7",
  partOfSlugs: ["the-rookie"],
  position: 7,
  ownLength: 778.2,
  ownProgress: 259.4,
  unitSlug: "minutes",
  status: "in-progress",
  publishedAt: "2025-01-08",
  externalId: "trakt-season-426935",
  externalLink: "https://trakt.tv/shows/the-rookie-2018/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
