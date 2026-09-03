import type { Show } from "../show.page-type.ts"

export const stargateInfinity = {
  id: "01a06802-9332-7038-a82f-1ea307d778f3",
  pageTypeSlug: "show",
  slug: "stargate-infinity",
  title: "Stargate Infinity",
  partOfSlugs: ["stargate-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2002-09-14",
  externalLink: "https://trakt.tv/shows/stargate-infinity",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
