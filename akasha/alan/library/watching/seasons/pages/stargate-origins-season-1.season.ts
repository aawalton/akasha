import type { Season } from "../season.page-type.ts"

export const stargateOriginsSeason1 = {
  id: "01a06802-b8bd-704b-9095-6b4ee74247af",
  pageTypeSlug: "season",
  slug: "stargate-origins-season-1",
  title: "Stargate Origins Season 1",
  partOfSlugs: ["stargate-origins"],
  position: 1,
  ownLength: 177,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-02-14",
  externalId: "trakt-season-155689",
  externalLink: "https://trakt.tv/shows/stargate-origins/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
