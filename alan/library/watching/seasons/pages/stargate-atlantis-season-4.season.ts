import type { Season } from "../season.page-type.ts"

export const stargateAtlantisSeason4 = {
  id: "01a06802-b8bd-7047-ab6b-5fb7e4f47eb5",
  pageTypeSlug: "season",
  slug: "stargate-atlantis-season-4",
  title: "Stargate Atlantis Season 4",
  partOfSlugs: ["stargate-atlantis"],
  position: 4,
  ownLength: 876,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-09-28",
  externalId: "trakt-season-7513",
  externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
