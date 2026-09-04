import type { Season } from "../season.page-type.ts"

export const starTrekTheNextGenerationSeason2 = {
  id: "01a06802-b8bd-701b-906e-00bdeb12738c",
  pageTypeSlug: "season",
  slug: "star-trek-the-next-generation-season-2",
  title: "Star Trek: The Next Generation Season 2",
  partOfSlugs: ["star-trek-the-next-generation"],
  position: 2,
  ownLength: 1011,
  ownProgress: 1011,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "1988-11-22",
  externalLink: "https://trakt.tv/shows/star-trek-the-next-generation/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
