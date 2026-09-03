import type { Season } from "../season.page-type.ts"

export const ironheartSpecials = {
  id: "01a06802-b8ba-702c-89fb-9870f9fee766",
  pageTypeSlug: "season",
  slug: "ironheart-specials",
  title: "Ironheart Specials",
  partOfSlugs: ["ironheart"],
  position: 0,
  ownLength: 4.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2025-06-14",
  externalId: "trakt-season-469174",
  externalLink: "https://trakt.tv/shows/ironheart/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
