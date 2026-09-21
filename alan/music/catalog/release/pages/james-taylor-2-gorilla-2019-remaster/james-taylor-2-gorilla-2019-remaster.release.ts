import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2Gorilla2019Remaster = {
  id: "01a0676a-d71f-7021-b32d-d6fd5cf0ba0a",
  type: "page-type/release",
  slug: "james-taylor-2-gorilla-2019-remaster",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1975-05-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0x491s63vRDvG25x2Fzrny",
      externalLink: "https://open.spotify.com/album/0x491s63vRDvG25x2Fzrny",
    },
  ],
  title: "Gorilla (2019 Remaster)",
} as const satisfies Release
