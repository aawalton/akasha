import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason7 = {
  id: "01a06802-b8b9-7020-bcc8-cbdb244dfca0",
  pageTypeSlug: "season",
  slug: "doctor-who-season-7",
  title: "Doctor Who Season 7",
  partOfSlugs: ["doctor-who-2005"],
  position: 7,
  ownLength: 585,
  ownProgress: 585,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2012-09-01",
  externalId: "trakt-season-60086",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
