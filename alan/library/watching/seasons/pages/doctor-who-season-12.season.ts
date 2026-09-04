import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason12 = {
  id: "01a06802-b8b9-7008-974c-ba3a38762e4a",
  pageTypeSlug: "season",
  slug: "doctor-who-season-12",
  title: "Doctor Who Season 12",
  partOfSlugs: ["doctor-who-2005"],
  position: 12,
  ownLength: 535.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-01-01",
  externalId: "trakt-season-204457",
  externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/12",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
