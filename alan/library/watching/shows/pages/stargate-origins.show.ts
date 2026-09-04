import type { Show } from "../show.page-type.ts"

export const stargateOrigins = {
  id: "01a06802-9332-7039-aad6-2c38660c15e6",
  pageTypeSlug: "show",
  slug: "stargate-origins",
  title: "Stargate Origins",
  partOfSlugs: ["stargate-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-02-14",
  externalLink: "https://trakt.tv/shows/stargate-origins",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
