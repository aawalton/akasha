import type { Season } from "../season.page-type.ts"

export const k9Specials = {
  id: "01a06802-b8ba-702e-882f-4e224c5e0f8c",
  pageTypeSlug: "season",
  slug: "k-9-specials",
  title: "K-9 Specials",
  partOfSlugs: ["k-9"],
  position: 0,
  ownLength: 4.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2009-07-23",
  externalId: "trakt-season-307012",
  externalLink: "https://trakt.tv/shows/k-9/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
