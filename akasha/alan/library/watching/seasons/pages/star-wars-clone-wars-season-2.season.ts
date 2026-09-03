import type { Season } from "../season.page-type.ts"

export const starWarsCloneWarsSeason2 = {
  id: "01a06802-b8bd-702c-b095-38450f3e2312",
  pageTypeSlug: "season",
  slug: "star-wars-clone-wars-season-2",
  title: "Star Wars: Clone Wars Season 2",
  partOfSlugs: ["clone-wars"],
  position: 2,
  ownLength: 30,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2004-03-26",
  externalId: "trakt-season-10285",
  externalLink: "https://trakt.tv/shows/star-wars-clone-wars/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
