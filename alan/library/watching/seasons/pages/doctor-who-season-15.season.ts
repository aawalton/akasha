import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason15 = {
  id: "01a06802-b8b9-700c-9d67-6f1b3c00557e",
  pageTypeSlug: "season",
  slug: "doctor-who-season-15",
  title: "Doctor Who Season 15",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 15,
  ownLength: 649.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1977-09-03",
  externalId: "trakt-season-435",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/15",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
