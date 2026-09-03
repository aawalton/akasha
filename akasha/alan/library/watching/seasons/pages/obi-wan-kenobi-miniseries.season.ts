import type { Season } from "../season.page-type.ts"

export const obiWanKenobiMiniseries = {
  id: "01a06802-b8bb-7042-a387-e842cc3dc113",
  pageTypeSlug: "season",
  slug: "obi-wan-kenobi-miniseries",
  title: "Obi-Wan Kenobi Miniseries",
  partOfSlugs: ["obi-wan-kenobi"],
  position: 1,
  ownLength: 280.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-05-26",
  externalId: "trakt-season-234906",
  externalLink: "https://trakt.tv/shows/obi-wan-kenobi/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
