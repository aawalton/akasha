import type { Season } from "../season.page-type.ts"

export const doctorWhoSpecials = {
  id: "01a06802-b8b9-7026-bc4c-09f8913c1811",
  pageTypeSlug: "season",
  slug: "doctor-who-specials",
  title: "Doctor Who Specials",
  partOfSlugs: ["doctor-who-1963-1989"],
  position: 0,
  ownLength: 14920.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "1954-03-24",
  externalId: "trakt-season-420",
  externalLink: "https://trakt.tv/shows/doctor-who/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
