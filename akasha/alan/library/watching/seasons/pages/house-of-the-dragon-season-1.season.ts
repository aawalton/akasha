import type { Season } from "../season.page-type.ts"

export const houseOfTheDragonSeason1 = {
  id: "01a06802-b8ba-7027-9243-5fefc45fc9c3",
  pageTypeSlug: "season",
  slug: "house-of-the-dragon-season-1",
  title: "House of the Dragon Season 1",
  partOfSlugs: ["house-of-the-dragon"],
  position: 1,
  ownLength: 619.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-08-22",
  externalId: "trakt-season-240800",
  externalLink: "https://trakt.tv/shows/house-of-the-dragon/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
