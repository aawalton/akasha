import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerLathi = {
  id: "01a0676a-d722-7060-a6af-78144a91fceb",
  type: "page-type/release",
  slug: "jada-facer-lathi",
  title: "LATHI",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.31,
  ownProgress: 3.31,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-07-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "16Ff7x0ARperiGuRGSQXzQ",
      externalLink: "https://open.spotify.com/album/16Ff7x0ARperiGuRGSQXzQ",
    },
  ],
} as const satisfies Release
