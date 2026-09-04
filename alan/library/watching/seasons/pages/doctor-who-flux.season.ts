import type { Season } from "../season.page-type.ts"

export const doctorWhoFlux = {
  id: "01a06802-b8b9-7001-8268-e18b21120df2",
  pageTypeSlug: "season",
  slug: "doctor-who-flux",
  title: "Doctor Who Flux",
  partOfSlugs: ["doctor-who-2005"],
  position: 13,
  ownLength: 658,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-10-31",
  externalId: "trakt-season-243449",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/13",
  lastSyncedAt: "2025-10-14",
} as const satisfies Season
