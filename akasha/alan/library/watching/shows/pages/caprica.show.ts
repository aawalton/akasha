import type { Show } from "../show.page-type.ts"

export const caprica = {
  id: "01a06802-9331-700e-8261-11fd1d9ad165",
  pageTypeSlug: "show",
  slug: "caprica",
  title: "Caprica",
  partOfSlugs: ["battlestar-galactica"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-01-23",
  externalLink: "https://trakt.tv/shows/caprica",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
