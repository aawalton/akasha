import type { Season } from "../season.page-type.ts"

export const theSarahJaneAdventuresSpecials = {
  id: "01a06802-b8bf-703b-a5c1-a376033245c4",
  pageTypeSlug: "season",
  slug: "the-sarah-jane-adventures-specials",
  title: "The Sarah Jane Adventures Specials",
  partOfSlugs: ["the-sarah-jane-adventures"],
  position: 0,
  ownLength: 111,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2007-01-01",
  externalId: "trakt-season-759",
  externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
