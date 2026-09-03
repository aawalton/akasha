import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason8 = {
  id: "01a06802-b8b9-7022-aeab-23478951b5c7",
  pageTypeSlug: "season",
  slug: "doctor-who-season-8",
  title: "Doctor Who Season 8",
  partOfSlugs: ["doctor-who-2005"],
  position: 8,
  ownLength: 592.2,
  ownProgress: 592.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-08-23",
  externalId: "trakt-season-60087",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/8",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
