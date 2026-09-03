import type { Show } from "../show.page-type.ts"

export const crusade = {
  id: "01a06802-9331-7016-9660-5f9b6da966e1",
  pageTypeSlug: "show",
  slug: "crusade",
  title: "Crusade",
  partOfSlugs: ["babylon-5-2"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1999-06-10",
  externalId: "crusade",
  externalLink: "https://trakt.tv/shows/crusade",
  lastSyncedAt: "2025-12-20",
} as const satisfies Show
