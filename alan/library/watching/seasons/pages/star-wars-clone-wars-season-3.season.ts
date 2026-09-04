import type { Season } from "../season.page-type.ts"

export const starWarsCloneWarsSeason3 = {
  id: "01a06802-b8bd-702d-a743-2ac90fbf2018",
  pageTypeSlug: "season",
  slug: "star-wars-clone-wars-season-3",
  title: "Star Wars: Clone Wars Season 3",
  partOfSlugs: ["clone-wars"],
  position: 3,
  ownLength: 60,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2005-03-21",
  externalId: "trakt-season-10286",
  externalLink: "https://trakt.tv/shows/star-wars-clone-wars/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
