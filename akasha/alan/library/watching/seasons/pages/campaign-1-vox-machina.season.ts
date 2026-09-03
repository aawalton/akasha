import type { Season } from "../season.page-type.ts"

export const campaign1VoxMachina = {
  id: "01a06802-b8b8-701f-b928-c93ee7b5d14b",
  pageTypeSlug: "season",
  slug: "campaign-1-vox-machina",
  title: "Campaign 1: Vox Machina",
  partOfSlugs: ["critical-role"],
  position: 1,
  ownLength: 27067.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-03-13",
  externalId: "trakt-season-112332",
  externalLink: "https://trakt.tv/shows/critical-role/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
