import type { Season } from "../season.page-type.ts"

export const starWarsAndorSpecials = {
  id: "01a06802-b8bd-702a-ab59-1160a3ae26e5",
  pageTypeSlug: "season",
  slug: "star-wars-andor-specials",
  title: "Star Wars: Andor Specials",
  partOfSlugs: ["andor"],
  position: 0,
  ownLength: 250.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2024-05-01",
  externalId: "trakt-season-425156",
  externalLink: "https://trakt.tv/shows/star-wars-andor/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
