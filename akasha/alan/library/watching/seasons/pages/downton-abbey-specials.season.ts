import type { Season } from "../season.page-type.ts"

export const downtonAbbeySpecials = {
  id: "01a06802-b8b9-702e-847e-260e0174214a",
  pageTypeSlug: "season",
  slug: "downton-abbey-specials",
  title: "Downton Abbey Specials",
  partOfSlugs: ["downton-abbey"],
  position: 0,
  ownLength: 838.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2011-12-21",
  externalId: "trakt-season-45533",
  externalLink: "https://trakt.tv/shows/downton-abbey/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
