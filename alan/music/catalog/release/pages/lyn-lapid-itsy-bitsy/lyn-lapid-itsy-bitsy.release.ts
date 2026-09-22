import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidItsyBitsy = {
  id: "01a0676a-d722-7019-bc24-6dd0bbe0b737",
  type: "page-type/release",
  slug: "lyn-lapid-itsy-bitsy",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2021-01-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "54DolYpYf4Ai92P5TV6IfB",
      externalLink: "https://open.spotify.com/album/54DolYpYf4Ai92P5TV6IfB",
    },
  ],
  title: "Itsy Bitsy",
} as const satisfies Release
