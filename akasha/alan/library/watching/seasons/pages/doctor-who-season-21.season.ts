import type { Season } from "../season.page-type.ts"

export const doctorWhoSeason21 = {
  id: "01a06802-b8b9-7013-96f9-30e9b5190e64",
  pageTypeSlug: "season",
  slug: "doctor-who-season-21",
  title: "Doctor Who Season 21",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 21,
  ownLength: 642,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1984-01-05",
  externalId: "trakt-season-441",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/21",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
