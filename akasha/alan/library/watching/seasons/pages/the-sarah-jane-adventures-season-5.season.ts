import type { Season } from "../season.page-type.ts"

export const theSarahJaneAdventuresSeason5 = {
  id: "01a06802-b8bf-703a-bc1d-95d13af680f7",
  pageTypeSlug: "season",
  slug: "the-sarah-jane-adventures-season-5",
  title: "The Sarah Jane Adventures Season 5",
  partOfSlugs: ["the-sarah-jane-adventures"],
  position: 5,
  ownLength: 180,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-10-03",
  externalId: "trakt-season-764",
  externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
