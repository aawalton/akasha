import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason20 = {
  id: "01a06802-b8b9-7012-b835-0d1da285e1da",
  pageTypeSlug: "season",
  slug: "doctor-who-season-20",
  title: "Doctor Who Season 20",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 20,
  ownLength: 550.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1983-01-03",
  externalId: "trakt-season-440",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/20",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
