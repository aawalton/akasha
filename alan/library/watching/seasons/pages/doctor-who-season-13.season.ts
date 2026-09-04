import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason13 = {
  id: "01a06802-b8b9-700a-9c9e-4b068889ff39",
  pageTypeSlug: "season",
  slug: "doctor-who-season-13",
  title: "Doctor Who Season 13",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 13,
  ownLength: 649.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1975-08-30",
  externalId: "trakt-season-433",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/13",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
