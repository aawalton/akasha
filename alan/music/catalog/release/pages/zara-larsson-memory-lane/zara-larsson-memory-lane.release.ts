import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMemoryLane = {
  id: "01a0676a-d724-704a-b3af-a23f4e2841dd",
  type: "page-type/release",
  slug: "zara-larsson-memory-lane",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2024-10-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "057XtVTFa9pDl6AivW7UeP",
      externalLink: "https://open.spotify.com/album/057XtVTFa9pDl6AivW7UeP",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Memory Lane",
} as const satisfies Release
