import type { Season } from "../season.page-type.ts"

export const starWarsTheCloneWarsSeason6 = {
  id: "01a06802-b8bd-7041-ab0a-f71ea2deeb41",
  pageTypeSlug: "season",
  slug: "star-wars-the-clone-wars-season-6",
  title: "Star Wars: The Clone Wars Season 6",
  partOfSlugs: ["star-wars-the-clone-wars"],
  position: 6,
  ownLength: 286.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2014-03-07",
  externalId: "trakt-season-91124",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
