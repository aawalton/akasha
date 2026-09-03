import type { Show } from "../show.page-type.ts"

export const talesOfTheTardis = {
  id: "01a06802-9332-7040-abe2-62dd3411b3b1",
  pageTypeSlug: "show",
  slug: "tales-of-the-tardis",
  title: "Tales of the TARDIS",
  partOfSlugs: ["doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-11-01",
  externalLink: "https://trakt.tv/shows/tales-of-the-tardis",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
