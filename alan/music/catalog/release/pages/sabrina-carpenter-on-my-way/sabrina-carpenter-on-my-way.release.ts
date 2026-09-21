import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterOnMyWay = {
  id: "01a0676a-d726-7024-b45e-aed8b7d7c1d2",
  type: "page-type/release",
  slug: "sabrina-carpenter-on-my-way",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2019-03-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1bcvtuHyO79DNAOOhHEkEm",
      externalLink: "https://open.spotify.com/album/1bcvtuHyO79DNAOOhHEkEm",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "On My Way",
} as const satisfies Release
