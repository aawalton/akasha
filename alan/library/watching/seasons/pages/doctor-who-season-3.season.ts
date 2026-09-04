import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason3 = {
  id: "01a06802-b8b9-7018-9247-197d66ede39a",
  pageTypeSlug: "season",
  slug: "doctor-who-season-3",
  title: "Doctor Who Season 3",
  partOfSlugs: ["doctor-who-2005"],
  position: 3,
  ownLength: 625.8,
  ownProgress: 625.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2007-04-01",
  externalId: "trakt-season-60082",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
