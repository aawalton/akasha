import type { Season } from "../season.page-type.ts"

export const theSarahJaneAdventuresSeason1 = {
  id: "01a06802-b8bf-7036-8136-9718a21f5323",
  pageTypeSlug: "season",
  slug: "the-sarah-jane-adventures-season-1",
  title: "The Sarah Jane Adventures Season 1",
  partOfSlugs: ["the-sarah-jane-adventures"],
  position: 1,
  ownLength: 300,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-09-24",
  externalId: "trakt-season-760",
  externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
