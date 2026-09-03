import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason2 = {
  id: "01a06802-b8b9-7010-a72f-be7dbd8148d7",
  pageTypeSlug: "season",
  slug: "doctor-who-season-2",
  title: "Doctor Who Season 2",
  partOfSlugs: ["doctor-who-2005"],
  position: 2,
  ownLength: 622.2,
  ownProgress: 622.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2006-04-15",
  externalId: "trakt-season-60081",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
