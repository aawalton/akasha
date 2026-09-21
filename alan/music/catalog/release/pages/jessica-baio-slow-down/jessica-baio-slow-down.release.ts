import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioSlowDown = {
  id: "01a0676a-d729-7024-868c-eb9c10e36712",
  type: "page-type/release",
  slug: "jessica-baio-slow-down",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-05-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Ej7j1DuYx8vqML3Ewtxtx",
      externalLink: "https://open.spotify.com/album/5Ej7j1DuYx8vqML3Ewtxtx",
    },
  ],
  title: "SLOW DOWN",
} as const satisfies Release
