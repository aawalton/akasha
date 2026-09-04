import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason9 = {
  id: "01a06802-b8b9-7024-96dc-50cf09f2b32f",
  pageTypeSlug: "season",
  slug: "doctor-who-season-9",
  title: "Doctor Who Season 9",
  partOfSlugs: ["doctor-who-2005"],
  position: 9,
  ownLength: 576,
  ownProgress: 576,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2015-09-19",
  externalId: "trakt-season-92093",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/9",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
