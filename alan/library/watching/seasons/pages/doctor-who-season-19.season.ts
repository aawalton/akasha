import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason19 = {
  id: "01a06802-b8b9-700f-a5e4-69faeb5c6dbc",
  pageTypeSlug: "season",
  slug: "doctor-who-season-19",
  title: "Doctor Who Season 19",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 19,
  ownLength: 649.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1982-01-04",
  externalId: "trakt-season-439",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/19",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
