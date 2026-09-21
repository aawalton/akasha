import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonCanTTameHer = {
  id: "01a0676a-d719-7059-94e3-d1fc5cb3e584",
  type: "page-type/release",
  slug: "zara-larsson-can-t-tame-her",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2023-01-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ytOBcbbFsYDHojnMP5Gs7",
      externalLink: "https://open.spotify.com/album/7ytOBcbbFsYDHojnMP5Gs7",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Can't Tame Her",
} as const satisfies Release
