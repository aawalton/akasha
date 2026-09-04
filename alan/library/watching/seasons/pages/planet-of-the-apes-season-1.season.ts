import type { Season } from "../season.page-type.ts"

export const planetOfTheApesSeason1 = {
  id: "01a06802-b8bc-701a-9495-144b44b0c817",
  pageTypeSlug: "season",
  slug: "planet-of-the-apes-season-1",
  title: "Planet of the Apes Season 1",
  partOfSlugs: ["planet-of-the-apes-1974"],
  position: 1,
  ownLength: 840,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1974-09-14",
  externalId: "trakt-season-38",
  externalLink: "https://trakt.tv/shows/planet-of-the-apes/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
