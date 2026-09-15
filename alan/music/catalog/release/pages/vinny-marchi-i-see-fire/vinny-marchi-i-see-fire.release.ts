import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiISeeFire = {
  id: "01a0676a-d721-703d-abd5-6a17928860f8",
  type: "release",
  slug: "vinny-marchi-i-see-fire",
  title: "I See Fire",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 3.890883,
  ownProgress: 3.890883,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-03-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wF4piytW5mSDob3qpbK40",
      externalLink: "https://open.spotify.com/album/5wF4piytW5mSDob3qpbK40",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
