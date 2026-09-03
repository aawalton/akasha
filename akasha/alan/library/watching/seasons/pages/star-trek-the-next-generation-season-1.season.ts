import type { Season } from "../season.page-type.ts"

export const starTrekTheNextGenerationSeason1 = {
  id: "01a06802-b8bd-701a-96ce-eece25355e3e",
  pageTypeSlug: "season",
  slug: "star-trek-the-next-generation-season-1",
  title: "Star Trek: The Next Generation Season 1",
  partOfSlugs: ["star-trek-the-next-generation"],
  position: 1,
  ownLength: 1195.2,
  ownProgress: 1195.2,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "1987-09-29",
  externalLink: "https://trakt.tv/shows/star-trek-the-next-generation/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
