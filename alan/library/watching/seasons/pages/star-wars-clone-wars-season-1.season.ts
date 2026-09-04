import type { Season } from "../season.page-type.ts"

export const starWarsCloneWarsSeason1 = {
  id: "01a06802-b8bd-702b-9b0c-c4b238de7b41",
  pageTypeSlug: "season",
  slug: "star-wars-clone-wars-season-1",
  title: "Star Wars: Clone Wars Season 1",
  partOfSlugs: ["clone-wars"],
  position: 1,
  ownLength: 30,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-11-07",
  externalId: "trakt-season-10284",
  externalLink: "https://trakt.tv/shows/star-wars-clone-wars/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
