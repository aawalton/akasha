import type { Season } from "../season.page-type.ts"

export const marvelSDaredevilSeason3 = {
  id: "01a06802-b8ba-7044-8b66-91822baa909c",
  pageTypeSlug: "season",
  slug: "marvel-s-daredevil-season-3",
  title: "Marvel's Daredevil Season 3",
  partOfSlugs: ["daredevil"],
  position: 3,
  ownLength: 676.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-10-19",
  externalId: "trakt-season-171802",
  externalLink: "https://trakt.tv/shows/marvel-s-daredevil/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
