import type { Season } from "../season.page-type.ts"

export const theOfficeSeason1 = {
  id: "01a06802-b8bf-7024-99f2-2ef583b8f100",
  pageTypeSlug: "season",
  slug: "the-office-season-1",
  title: "The Office Season 1",
  partOfSlugs: ["the-office"],
  position: 1,
  ownLength: 133.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2005-03-24",
  externalId: "trakt-season-7609",
  externalLink: "https://trakt.tv/shows/the-office/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
