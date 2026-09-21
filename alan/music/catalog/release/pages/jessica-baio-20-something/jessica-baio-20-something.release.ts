import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaio20Something = {
  id: "01a0676a-d714-701e-9c38-b8942f39a809",
  type: "page-type/release",
  slug: "jessica-baio-20-something",
  title: "20 something",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 2.6797,
  ownProgress: 2.6797,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2024-03-29",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5xoHpRnnxIH33pFgPXtYTf",
      externalLink: "https://open.spotify.com/album/5xoHpRnnxIH33pFgPXtYTf",
    },
  ],
} as const satisfies Release
