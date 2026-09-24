import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdNobodyElse = {
  id: "01a0676a-d725-706d-b82e-ab1f2c1b6254",
  type: "page-type/release",
  slug: "em-beihold-nobody-else",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2021-04-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2tWUCLphagUQNBOcyQqUCR",
      externalLink: "https://open.spotify.com/album/2tWUCLphagUQNBOcyQqUCR",
      lastSyncedAt: "2026-09-24",
    },
  ],
  title: "Nobody Else",
} as const satisfies Release
