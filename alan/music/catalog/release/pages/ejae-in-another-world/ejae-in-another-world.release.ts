import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ejaeInAnotherWorld = {
  id: "01a0676a-d721-7066-bb9a-61fc54a1fdbe",
  type: "page-type/release",
  slug: "ejae-in-another-world",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ejae"],
  position: 0,
  publishedAt: "2025-10-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PKwr5WeVaZlX6coR33aQ3",
      externalLink: "https://open.spotify.com/album/2PKwr5WeVaZlX6coR33aQ3",
      lastSyncedAt: "2025-10-28",
    },
  ],
  title: "In Another World",
} as const satisfies Release
