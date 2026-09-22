import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidBuzzkillForever = {
  id: "01a0676a-d719-704d-bab1-d8802beb7baf",
  type: "page-type/release",
  slug: "lyn-lapid-buzzkill-forever",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2025-09-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5shzwC9p2nNFivMx37PFoD",
      externalLink: "https://open.spotify.com/album/5shzwC9p2nNFivMx37PFoD",
    },
  ],
  title: "BUZZKILL (forever)",
} as const satisfies Release
