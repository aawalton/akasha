import type { Show } from "../show.page-type.ts"

export const battlestarGalactica1978 = {
  id: "01a06802-9331-7009-a6f9-d1d2ee9c7cef",
  pageTypeSlug: "show",
  slug: "battlestar-galactica-1978",
  title: "Battlestar Galactica (1978)",
  partOfSlugs: ["battlestar-galactica"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1978-09-18",
  externalLink: "https://trakt.tv/shows/battlestar-galactica",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
