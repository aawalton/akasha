import type { Season } from "../season.page-type.ts"

export const whiteCollarSeason5 = {
  id: "01a06802-b8c0-701f-8fd7-05b8a51fa093",
  pageTypeSlug: "season",
  slug: "white-collar-season-5",
  title: "White Collar Season 5",
  partOfSlugs: ["white-collar"],
  position: 5,
  ownLength: 565.2,
  ownProgress: 565.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2013-10-18",
  externalId: "trakt-season-31979",
  externalLink: "https://trakt.tv/shows/white-collar/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
