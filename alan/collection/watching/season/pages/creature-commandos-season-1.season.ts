import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const creatureCommandosSeason1 = {
  id: "01a06802-b8b8-7031-8303-f0714cb46936",
  type: "page-type/season",
  slug: "creature-commandos-season-1",
  title: "Creature Commandos Season 1",
  partOfCollections: ["show/creature-commandos"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-12-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-315613",
      externalLink: "https://trakt.tv/shows/creature-commandos/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:25:52.413Z",
} as const satisfies Season
