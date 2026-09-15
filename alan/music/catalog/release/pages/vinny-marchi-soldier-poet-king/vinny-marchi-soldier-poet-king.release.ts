import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiSoldierPoetKing = {
  id: "01a0676a-d729-704c-8b69-bee154789b48",
  type: "release",
  slug: "vinny-marchi-soldier-poet-king",
  title: "Soldier, Poet, King",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 2.803767,
  ownProgress: 2.803767,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2022-10-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6gm0ZcEAjcMRoJITJudeWC",
      externalLink: "https://open.spotify.com/album/6gm0ZcEAjcMRoJITJudeWC",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
