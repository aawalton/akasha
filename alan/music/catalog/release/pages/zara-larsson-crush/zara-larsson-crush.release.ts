import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonCrush = {
  id: "01a0676a-d71b-7042-b7a6-78e473a95da7",
  type: "page-type/release",
  slug: "zara-larsson-crush",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2025-08-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "66uFqZHRtk56y6wyj0EFst",
      externalLink: "https://open.spotify.com/album/66uFqZHRtk56y6wyj0EFst",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Crush",
} as const satisfies Release
