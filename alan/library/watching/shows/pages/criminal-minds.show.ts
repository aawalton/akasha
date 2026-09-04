import type { Show } from "../show.page-type.ts"

export const criminalMinds = {
  id: "01a06802-9331-7014-897d-fdc4c73f4218",
  pageTypeSlug: "show",
  slug: "criminal-minds",
  title: "Criminal Minds",
  partOfSlugs: ["crime-investigation-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "in-progress",
  rank: "C",
  publishedAt: "2005-09-22",
  externalId: "criminal-minds",
  externalLink: "https://trakt.tv/shows/criminal-minds",
  lastSyncedAt: "2025-12-08",
} as const satisfies Show
