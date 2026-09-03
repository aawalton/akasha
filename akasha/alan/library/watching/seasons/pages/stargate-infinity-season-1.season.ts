import type { Season } from "../season.page-type.ts"

export const stargateInfinitySeason1 = {
  id: "01a06802-b8bd-704a-864d-9c54e3c82ef1",
  pageTypeSlug: "season",
  slug: "stargate-infinity-season-1",
  title: "Stargate Infinity Season 1",
  partOfSlugs: ["stargate-infinity"],
  position: 1,
  ownLength: 546,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2002-09-14",
  externalId: "trakt-season-8620",
  externalLink: "https://trakt.tv/shows/stargate-infinity/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
