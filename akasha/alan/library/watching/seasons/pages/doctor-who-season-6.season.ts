import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason6 = {
  id: "01a06802-b8b9-701e-923f-a7a2e1b8c50d",
  pageTypeSlug: "season",
  slug: "doctor-who-season-6",
  title: "Doctor Who Season 6",
  partOfSlugs: ["doctor-who-2005"],
  position: 6,
  ownLength: 604.2,
  ownProgress: 604.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2011-04-23",
  externalId: "trakt-season-60085",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
