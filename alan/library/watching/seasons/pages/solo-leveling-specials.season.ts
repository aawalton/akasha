import type { Season } from "../season.page-type.ts"

export const soloLevelingSpecials = {
  id: "01a06802-b8bc-7040-9acc-701fc9eaf459",
  pageTypeSlug: "season",
  slug: "solo-leveling-specials",
  title: "Solo Leveling Specials",
  partOfSlugs: ["solo-leveling"],
  position: 0,
  ownLength: 24,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2024-02-24",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/solo-leveling/seasons/0",
  lastSyncedAt: "2025-12-24",
} as const satisfies Season
