import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2SpancilHill = {
  id: "01a0676a-d729-7071-9ab4-ad28b6812182",
  type: "page-type/release",
  slug: "celtic-woman-2-spancil-hill",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2025-07-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4vqPZ33aCyf4YmwYSrc0qd",
      externalLink: "https://open.spotify.com/album/4vqPZ33aCyf4YmwYSrc0qd",
    },
  ],
  title: "Spancil Hill",
} as const satisfies Release
