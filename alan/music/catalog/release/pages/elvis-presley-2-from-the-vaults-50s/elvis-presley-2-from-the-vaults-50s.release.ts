import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2FromTheVaults50s = {
  id: "01a0676a-d71e-703c-a16a-25d93f6bddda",
  type: "page-type/release",
  slug: "elvis-presley-2-from-the-vaults-50s",
  title: "From The Vaults -'50s",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 44.484333,
  ownProgress: 44.484333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-03-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6bl6q2RIVWKMaTLkC3vN2A",
      externalLink: "https://open.spotify.com/album/6bl6q2RIVWKMaTLkC3vN2A",
    },
  ],
} as const satisfies Release
