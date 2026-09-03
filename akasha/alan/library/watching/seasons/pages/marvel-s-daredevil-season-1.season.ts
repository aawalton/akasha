import type { Season } from "../season.page-type.ts"

export const marvelSDaredevilSeason1 = {
  id: "01a06802-b8ba-7042-8d26-72fb030d8fbb",
  pageTypeSlug: "season",
  slug: "marvel-s-daredevil-season-1",
  title: "Marvel's Daredevil Season 1",
  partOfSlugs: ["daredevil"],
  position: 1,
  ownLength: 712.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-04-10",
  externalId: "trakt-season-102670",
  externalLink: "https://trakt.tv/shows/marvel-s-daredevil/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
