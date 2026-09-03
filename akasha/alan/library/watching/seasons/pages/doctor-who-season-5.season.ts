import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason5 = {
  id: "01a06802-b8b9-701c-be37-e3f2b10b8f20",
  pageTypeSlug: "season",
  slug: "doctor-who-season-5",
  title: "Doctor Who Season 5",
  partOfSlugs: ["doctor-who-2005"],
  position: 5,
  ownLength: 610.8,
  ownProgress: 610.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2010-04-03",
  externalId: "trakt-season-60084",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
