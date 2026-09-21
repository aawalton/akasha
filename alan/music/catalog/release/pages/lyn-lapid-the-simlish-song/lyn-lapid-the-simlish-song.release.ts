import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidTheSimlishSong = {
  id: "01a0676a-d72e-700a-a80b-de9d37c817d2",
  type: "page-type/release",
  slug: "lyn-lapid-the-simlish-song",
  title: "the simlish song",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 3.317467,
  ownProgress: 3.317467,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2025-10-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3bNCCGuJGEtCFZ5H7htePd",
      externalLink: "https://open.spotify.com/album/3bNCCGuJGEtCFZ5H7htePd",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Release
