import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const reneeRappEverythingToEveryone = {
  id: "01a0676a-d71d-7042-b541-ad671fc15402",
  type: "page-type/release",
  slug: "renee-rapp-everything-to-everyone",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/renee-rapp"],
  position: 0,
  publishedAt: "2022-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Kk5hoolfW8UN6cTSo5fXJ",
      externalLink: "https://open.spotify.com/album/4Kk5hoolfW8UN6cTSo5fXJ",
    },
  ],
  title: "Everything To Everyone",
} as const satisfies Release
