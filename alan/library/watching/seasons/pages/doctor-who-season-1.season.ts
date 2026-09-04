import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason1 = {
  id: "01a06802-b8b9-7002-b5cb-08af6e0ac10f",
  pageTypeSlug: "season",
  slug: "doctor-who-season-1",
  title: "Doctor Who Season 1",
  partOfSlugs: ["doctor-who-2005"],
  position: 1,
  ownLength: 583.8,
  ownProgress: 583.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2005-03-26",
  externalId: "trakt-season-60080",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
