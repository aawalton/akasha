import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const emeiIrresponsible = {
  id: "01a0676a-d722-7003-b8e7-5e5e125ac4d3",
  type: "release",
  slug: "emei-irresponsible",
  title: "Irresponsible",
  partOfCollections: ["emei"],
  position: 0,
  ownLength: 2.079183,
  ownProgress: 2.079183,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-05-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "59S6Jtnow51dgkKl1pKBKd",
      externalLink: "https://open.spotify.com/album/59S6Jtnow51dgkKl1pKBKd",
    },
  ],
} as const satisfies Release
