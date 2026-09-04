import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason52 = {
  id: "01a06802-b8b9-701d-8f73-00222c6b5cff",
  pageTypeSlug: "season",
  slug: "doctor-who-season-5-2",
  title: "Doctor Who Season 5",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 5,
  ownLength: 1000.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1967-09-02",
  externalId: "trakt-season-425",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
