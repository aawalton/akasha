import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2DelicateSeebRemix = {
  id: "01a0676a-d71c-7005-b019-fb80d5410e70",
  type: "page-type/release",
  slug: "taylor-swift-2-delicate-seeb-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2018-06-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gU675c7KZ54MzEcL1O3px",
      externalLink: "https://open.spotify.com/album/7gU675c7KZ54MzEcL1O3px",
    },
  ],
  title: "Delicate (Seeb Remix)",
} as const satisfies Release
