import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason10 = {
  id: "01a06802-b8b9-7004-b8ec-d1899a4fd811",
  pageTypeSlug: "season",
  slug: "doctor-who-season-10",
  title: "Doctor Who Season 10",
  partOfSlugs: ["doctor-who-2005"],
  position: 10,
  ownLength: 564,
  ownProgress: 564,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2017-04-15",
  externalId: "trakt-season-119822",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/10",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
