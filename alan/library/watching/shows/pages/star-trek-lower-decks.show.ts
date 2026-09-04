import type { Show } from "../show.page-type.ts"

export const starTrekLowerDecks = {
  id: "01a06802-9332-702a-87a1-cd80caa0b049",
  pageTypeSlug: "show",
  slug: "star-trek-lower-decks",
  title: "Star Trek: Lower Decks",
  partOfSlugs: ["star-trek-3"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-08-06",
  externalLink: "https://trakt.tv/shows/star-trek-lower-decks",
  lastSyncedAt: "2025-10-02",
} as const satisfies Show
