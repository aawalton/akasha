import type { Season } from "../season.page-type.ts"

export const battlestarGalacticaMiniseries = {
  id: "01a06802-b8b8-7000-9310-6336d49b1c46",
  pageTypeSlug: "season",
  slug: "battlestar-galactica-miniseries",
  title: "Battlestar Galactica Miniseries",
  partOfSlugs: ["battlestar-galactica-2004"],
  position: 1,
  ownLength: 184.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-12-08",
  externalId: "trakt-season-243233",
  externalLink: "https://trakt.tv/shows/battlestar-galactica-2003/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
