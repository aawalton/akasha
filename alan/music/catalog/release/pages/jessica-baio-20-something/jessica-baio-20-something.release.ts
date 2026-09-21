import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaio20Something = {
  id: "01a0676a-d714-701e-9c38-b8942f39a809",
  type: "page-type/release",
  slug: "jessica-baio-20-something",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-03-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5xoHpRnnxIH33pFgPXtYTf",
      externalLink: "https://open.spotify.com/album/5xoHpRnnxIH33pFgPXtYTf",
    },
  ],
  title: "20 something",
} as const satisfies Release
