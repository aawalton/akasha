import type { Show } from "../show.page-type.ts"

export const stargateUniverse = {
  id: "01a06802-9332-703b-90e7-65faf4fa9eed",
  pageTypeSlug: "show",
  slug: "stargate-universe",
  title: "Stargate Universe",
  partOfSlugs: ["stargate-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-10-02",
  externalLink: "https://trakt.tv/shows/stargate-universe",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
