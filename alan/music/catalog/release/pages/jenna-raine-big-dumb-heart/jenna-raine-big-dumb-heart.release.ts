import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineBigDumbHeart = {
  id: "01a0676a-d718-7057-837f-4dcff316641e",
  type: "release",
  slug: "jenna-raine-big-dumb-heart",
  title: "Big Dumb Heart",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 3.605233,
  ownProgress: 3.605233,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-11-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CgmwafARAUBIoyuOVCDnm",
      externalLink: "https://open.spotify.com/album/1CgmwafARAUBIoyuOVCDnm",
    },
  ],
} as const satisfies Release
