import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiISeeFire = {
  id: "01a0676a-d721-703d-abd5-6a17928860f8",
  type: "page-type/release",
  slug: "vinny-marchi-i-see-fire",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-03-08",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wF4piytW5mSDob3qpbK40",
      externalLink: "https://open.spotify.com/album/5wF4piytW5mSDob3qpbK40",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "I See Fire",
} as const satisfies Release
