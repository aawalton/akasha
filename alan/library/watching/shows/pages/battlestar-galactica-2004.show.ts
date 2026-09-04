import type { Show } from "../show.page-type.ts"

export const battlestarGalactica2004 = {
  id: "01a06802-9331-700a-ae44-b7ab5efc9472",
  pageTypeSlug: "show",
  slug: "battlestar-galactica-2004",
  title: "Battlestar Galactica (2004)",
  partOfSlugs: ["battlestar-galactica"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-12-08",
  externalLink: "https://trakt.tv/shows/battlestar-galactica-2003",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
