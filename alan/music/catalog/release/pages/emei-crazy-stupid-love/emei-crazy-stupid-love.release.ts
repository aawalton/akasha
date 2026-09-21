import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiCrazyStupidLove = {
  id: "01a0676a-d71b-7032-9636-2df14c5a340b",
  type: "page-type/release",
  slug: "emei-crazy-stupid-love",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2025-02-26",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0058kPDT6f9sJzVj6m7MhY",
      externalLink: "https://open.spotify.com/album/0058kPDT6f9sJzVj6m7MhY",
    },
  ],
  title: "Crazy Stupid Love",
} as const satisfies Release
