import type { Season } from "../season.page-type.ts"

export const stargateAtlantisSpecials = {
  id: "01a06802-b8bd-7049-9594-e820097dda5d",
  pageTypeSlug: "season",
  slug: "stargate-atlantis-specials",
  title: "Stargate Atlantis Specials",
  partOfSlugs: ["stargate-atlantis"],
  position: 0,
  ownLength: 847.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2004-07-04",
  externalId: "trakt-season-7509",
  externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
