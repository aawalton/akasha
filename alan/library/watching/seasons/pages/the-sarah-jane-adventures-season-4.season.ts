import type { Season } from "../season.page-type.ts"

export const theSarahJaneAdventuresSeason4 = {
  id: "01a06802-b8bf-7039-8be6-59305fac97bf",
  pageTypeSlug: "season",
  slug: "the-sarah-jane-adventures-season-4",
  title: "The Sarah Jane Adventures Season 4",
  partOfSlugs: ["the-sarah-jane-adventures"],
  position: 4,
  ownLength: 360,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-10-11",
  externalId: "trakt-season-763",
  externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
