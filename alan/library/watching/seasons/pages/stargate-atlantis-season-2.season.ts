import type { Season } from "../season.page-type.ts"

export const stargateAtlantisSeason2 = {
  id: "01a06802-b8bd-7045-a69c-3161b0de1040",
  pageTypeSlug: "season",
  slug: "stargate-atlantis-season-2",
  title: "Stargate Atlantis Season 2",
  partOfSlugs: ["stargate-atlantis"],
  position: 2,
  ownLength: 870,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2005-07-16",
  externalId: "trakt-season-7511",
  externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
