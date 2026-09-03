import type { Season } from "../season.page-type.ts"

export const theSarahJaneAdventuresSeason3 = {
  id: "01a06802-b8bf-7038-ae64-ff8ba72153f6",
  pageTypeSlug: "season",
  slug: "the-sarah-jane-adventures-season-3",
  title: "The Sarah Jane Adventures Season 3",
  partOfSlugs: ["the-sarah-jane-adventures"],
  position: 3,
  ownLength: 360,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-10-15",
  externalId: "trakt-season-762",
  externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
