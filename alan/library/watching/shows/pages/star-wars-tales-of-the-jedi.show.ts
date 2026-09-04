import type { Show } from "../show.page-type.ts"

export const starWarsTalesOfTheJedi = {
  id: "01a06802-9332-7034-9508-8522d27666d9",
  pageTypeSlug: "show",
  slug: "star-wars-tales-of-the-jedi",
  title: "Star Wars: Tales of the Jedi",
  partOfSlugs: ["star-wars-2"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-10-26",
  externalLink: "https://trakt.tv/shows/star-wars-tales-of-the-jedi",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
