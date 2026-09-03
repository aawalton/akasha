import type { Season } from "../season.page-type.ts"

export const starWarsTheCloneWarsSeason7 = {
  id: "01a06802-b8bd-7042-a2d3-de5e8062c107",
  pageTypeSlug: "season",
  slug: "star-wars-the-clone-wars-season-7",
  title: "Star Wars: The Clone Wars Season 7",
  partOfSlugs: ["star-wars-the-clone-wars"],
  position: 7,
  ownLength: 324,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-02-21",
  externalId: "trakt-season-144529",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
