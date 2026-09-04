import type { Season } from "../season.page-type.ts"

export const whiteCollarSeason6 = {
  id: "01a06802-b8c0-7020-914c-46e58736b787",
  pageTypeSlug: "season",
  slug: "white-collar-season-6",
  title: "White Collar Season 6",
  partOfSlugs: ["white-collar"],
  position: 6,
  ownLength: 264,
  ownProgress: 264,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-11-07",
  externalId: "trakt-season-62100",
  externalLink: "https://trakt.tv/shows/white-collar/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
