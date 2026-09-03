import type { Season } from "../season.page-type.ts"

export const starWarsTheCloneWarsSpecials = {
  id: "01a06802-b8bd-7043-8a37-b44a2b614c4d",
  pageTypeSlug: "season",
  slug: "star-wars-the-clone-wars-specials",
  title: "Star Wars: The Clone Wars Specials",
  partOfSlugs: ["star-wars-the-clone-wars"],
  position: 0,
  ownLength: 1227,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2008-09-04",
  externalId: "trakt-season-12741",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
