import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiIrresponsible = {
  id: "01a0676a-d722-7003-b8e7-5e5e125ac4d3",
  type: "page-type/release",
  slug: "emei-irresponsible",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2023-05-26",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "59S6Jtnow51dgkKl1pKBKd",
      externalLink: "https://open.spotify.com/album/59S6Jtnow51dgkKl1pKBKd",
    },
  ],
  title: "Irresponsible",
} as const satisfies Release
