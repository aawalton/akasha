import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason11 = {
  id: "01a06802-b8b9-7006-aff9-27a4f02d02f9",
  pageTypeSlug: "season",
  slug: "doctor-who-season-11",
  title: "Doctor Who Season 11",
  partOfSlugs: ["doctor-who-2005"],
  position: 11,
  ownLength: 510,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "paused",
  publishedAt: "2018-10-07",
  externalId: "trakt-season-171300",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/11",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
