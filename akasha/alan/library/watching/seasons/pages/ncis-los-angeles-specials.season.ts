import type { Season } from "../season.page-type.ts"

export const ncisLosAngelesSpecials = {
  id: "01a06802-b8bb-7018-b9a3-ee2dffb005dd",
  pageTypeSlug: "season",
  slug: "ncis-los-angeles-specials",
  title: "NCIS: Los Angeles Specials",
  partOfSlugs: ["ncis-los-angeles"],
  position: 0,
  ownLength: 43.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2023-05-22",
  externalId: "trakt-season-29184",
  externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
