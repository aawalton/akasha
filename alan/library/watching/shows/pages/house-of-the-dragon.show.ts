import type { Show } from "../show.page-type.ts"

export const houseOfTheDragon = {
  id: "01a06802-9332-7000-886d-5b74a9c8a6ef",
  pageTypeSlug: "show",
  slug: "house-of-the-dragon",
  title: "House of the Dragon",
  partOfSlugs: ["game-of-thrones-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-08-21",
  externalLink: "https://trakt.tv/shows/house-of-the-dragon/seasons/all",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
