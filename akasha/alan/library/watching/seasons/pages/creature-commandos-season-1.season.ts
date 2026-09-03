import type { Season } from "../season.page-type.ts"

export const creatureCommandosSeason1 = {
  id: "01a06802-b8b8-7031-8303-f0714cb46936",
  pageTypeSlug: "season",
  slug: "creature-commandos-season-1",
  title: "Creature Commandos Season 1",
  partOfSlugs: ["creature-commandos"],
  position: 1,
  ownLength: 165,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-12-05",
  externalId: "trakt-season-315613",
  externalLink: "https://trakt.tv/shows/creature-commandos/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
