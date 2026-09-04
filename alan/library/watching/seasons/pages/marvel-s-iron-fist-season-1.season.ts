import type { Season } from "../season.page-type.ts"

export const marvelSIronFistSeason1 = {
  id: "01a06802-b8ba-7046-97ca-c0a071674a85",
  pageTypeSlug: "season",
  slug: "marvel-s-iron-fist-season-1",
  title: "Marvel's Iron Fist Season 1",
  partOfSlugs: ["iron-fist"],
  position: 1,
  ownLength: 726,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-03-17",
  externalId: "trakt-season-133293",
  externalLink: "https://trakt.tv/shows/marvel-s-iron-fist/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
