import type { Show } from "../show.page-type.ts"

export const returnToThePlanetOfTheApes = {
  id: "01a06802-9332-7019-8809-7266f138f2bb",
  pageTypeSlug: "show",
  slug: "return-to-the-planet-of-the-apes",
  title: "Return to the Planet of the Apes",
  partOfSlugs: ["planet-of-the-apes-2"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1975-09-06",
  externalLink: "https://trakt.tv/shows/return-to-the-planet-of-the-apes",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
