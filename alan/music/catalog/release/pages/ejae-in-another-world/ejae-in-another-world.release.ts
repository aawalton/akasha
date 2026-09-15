import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ejaeInAnotherWorld = {
  id: "01a0676a-d721-7066-bb9a-61fc54a1fdbe",
  type: "release",
  slug: "ejae-in-another-world",
  title: "In Another World",
  partOfCollections: ["artist/ejae"],
  position: 0,
  ownLength: 2.925517,
  ownProgress: 2.925517,
  unit: "unit/minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2025-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PKwr5WeVaZlX6coR33aQ3",
      externalLink: "https://open.spotify.com/album/2PKwr5WeVaZlX6coR33aQ3",
      lastSyncedAt: "2025-10-28",
    },
  ],
} as const satisfies Release
