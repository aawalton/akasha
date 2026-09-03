import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason18 = {
  id: "01a06802-b8b9-700e-92e0-222ed96c9255",
  pageTypeSlug: "season",
  slug: "doctor-who-season-18",
  title: "Doctor Who Season 18",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 18,
  ownLength: 700.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1980-08-30",
  externalId: "trakt-season-438",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/18",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
