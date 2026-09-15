import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiCrazyStupidLove = {
  id: "01a0676a-d71b-7032-9636-2df14c5a340b",
  type: "page-type/release",
  slug: "emei-crazy-stupid-love",
  title: "Crazy Stupid Love",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 2.60555,
  ownProgress: 2.60555,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2025-02-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0058kPDT6f9sJzVj6m7MhY",
      externalLink: "https://open.spotify.com/album/0058kPDT6f9sJzVj6m7MhY",
    },
  ],
} as const satisfies Release
