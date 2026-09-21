import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiSoldierPoetKing = {
  id: "01a0676a-d729-704c-8b69-bee154789b48",
  type: "page-type/release",
  slug: "vinny-marchi-soldier-poet-king",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-10-28",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6gm0ZcEAjcMRoJITJudeWC",
      externalLink: "https://open.spotify.com/album/6gm0ZcEAjcMRoJITJudeWC",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Soldier, Poet, King",
} as const satisfies Release
