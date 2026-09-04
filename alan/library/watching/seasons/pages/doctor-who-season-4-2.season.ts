import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason42 = {
  id: "01a06802-b8b9-701b-9829-14257090168a",
  pageTypeSlug: "season",
  slug: "doctor-who-season-4-2",
  title: "Doctor Who Season 4",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 4,
  ownLength: 1069.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1966-09-10",
  externalId: "trakt-season-424",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
