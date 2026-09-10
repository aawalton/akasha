import type { Show } from "../show.page-type.types.ts"

export const theSarahJaneAdventures = {
  id: "01a06802-9333-7002-baa3-013325e48f15",
  pageTypeSlug: "show",
  type: "show",
  slug: "the-sarah-jane-adventures",
  title: "The Sarah Jane Adventures",
  partOfCollections: ["doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2007-01-01",
  externalLink: "https://trakt.tv/shows/the-sarah-jane-adventures",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
