import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdNobodyElse = {
  id: "01a0676a-d725-706d-b82e-ab1f2c1b6254",
  type: "page-type/release",
  slug: "em-beihold-nobody-else",
  title: "Nobody Else",
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  ownLength: 3.22885,
  ownProgress: 3.22885,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2021-04-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "523FtykzwS297yiTBg54tQ",
      externalLink: "https://open.spotify.com/album/523FtykzwS297yiTBg54tQ",
    },
  ],
} as const satisfies Release
