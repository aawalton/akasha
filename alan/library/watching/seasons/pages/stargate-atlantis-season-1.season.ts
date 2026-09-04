import type { Season } from "../season.page-type.ts"

export const stargateAtlantisSeason1 = {
  id: "01a06802-b8bd-7044-b4b5-8d835f164fe8",
  pageTypeSlug: "season",
  slug: "stargate-atlantis-season-1",
  title: "Stargate Atlantis Season 1",
  partOfSlugs: ["stargate-atlantis"],
  position: 1,
  ownLength: 865.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2004-07-16",
  externalId: "trakt-season-7510",
  externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
