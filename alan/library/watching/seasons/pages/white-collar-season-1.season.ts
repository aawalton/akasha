import type { Season } from "../season.page-type.ts"

export const whiteCollarSeason1 = {
  id: "01a06802-b8c0-701b-9c87-a2e8c353edc5",
  pageTypeSlug: "season",
  slug: "white-collar-season-1",
  title: "White Collar Season 1",
  partOfSlugs: ["white-collar"],
  position: 1,
  ownLength: 616.2,
  ownProgress: 616.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2009-10-24",
  externalId: "trakt-season-31975",
  externalLink: "https://trakt.tv/shows/white-collar/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
