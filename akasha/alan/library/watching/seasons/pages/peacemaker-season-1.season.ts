import type { Season } from "../season.page-type.ts"

export const peacemakerSeason1 = {
  id: "01a06802-b8bc-700f-ab18-270629544386",
  pageTypeSlug: "season",
  slug: "peacemaker-season-1",
  title: "Peacemaker Season 1",
  partOfSlugs: ["peacemaker"],
  position: 1,
  ownLength: 576,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-10-06",
  externalId: "trakt-season-32305",
  externalLink: "https://trakt.tv/shows/peacemaker/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
