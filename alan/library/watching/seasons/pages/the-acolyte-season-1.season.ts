import type { Season } from "../season.page-type.ts"

export const theAcolyteSeason1 = {
  id: "01a06802-b8be-7034-b10a-3db98723bdff",
  pageTypeSlug: "season",
  slug: "the-acolyte-season-1",
  title: "The Acolyte Season 1",
  partOfSlugs: ["the-acolyte"],
  position: 1,
  ownLength: 328.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-06-05",
  externalId: "trakt-season-285382",
  externalLink: "https://trakt.tv/shows/the-acolyte/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
