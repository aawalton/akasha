import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraSofia = {
  id: "01a0676a-d729-7049-b745-17ff3a6278e0",
  type: "page-type/release",
  slug: "aurora-sofia",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2021-06-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3nRt1BK66SS8O3nCvfhqm1",
      externalLink: "https://open.spotify.com/album/3nRt1BK66SS8O3nCvfhqm1",
    },
  ],
  title: "Sofia",
} as const satisfies Release
