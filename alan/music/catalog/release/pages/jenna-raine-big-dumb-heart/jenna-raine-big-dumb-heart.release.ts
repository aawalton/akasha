import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineBigDumbHeart = {
  id: "01a0676a-d718-7057-837f-4dcff316641e",
  type: "page-type/release",
  slug: "jenna-raine-big-dumb-heart",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2023-11-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CgmwafARAUBIoyuOVCDnm",
      externalLink: "https://open.spotify.com/album/1CgmwafARAUBIoyuOVCDnm",
    },
  ],
  title: "Big Dumb Heart",
} as const satisfies Release
