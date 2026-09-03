import type { Season } from "../season.page-type.ts"

export const starWarsCloneWarsSpecials = {
  id: "01a06802-b8bd-702e-b181-4d5296e1800a",
  pageTypeSlug: "season",
  slug: "star-wars-clone-wars-specials",
  title: "Star Wars: Clone Wars Specials",
  partOfSlugs: ["clone-wars"],
  position: 0,
  ownLength: 160.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2005-04-24",
  externalId: "trakt-season-262044",
  externalLink: "https://trakt.tv/shows/star-wars-clone-wars/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
