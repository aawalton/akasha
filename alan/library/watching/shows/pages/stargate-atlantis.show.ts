import type { Show } from "../show.page-type.ts"

export const stargateAtlantis = {
  id: "01a06802-9332-7037-a505-e87c5d2c83ab",
  pageTypeSlug: "show",
  slug: "stargate-atlantis",
  title: "Stargate Atlantis",
  partOfSlugs: ["stargate-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2004-07-16",
  externalLink: "https://trakt.tv/shows/stargate-atlantis",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
