import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason4 = {
  id: "01a06802-b8b9-701a-a84a-870282c6c649",
  pageTypeSlug: "season",
  slug: "doctor-who-season-4",
  title: "Doctor Who Season 4",
  partOfSlugs: ["doctor-who-2005"],
  position: 4,
  ownLength: 642,
  ownProgress: 642,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2008-04-05",
  externalId: "trakt-season-60083",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
