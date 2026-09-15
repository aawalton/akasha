import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryHarleysInHawaii = {
  id: "01a0676a-d71f-7051-8ad2-83857d18f3c2",
  type: "page-type/release",
  slug: "katy-perry-harleys-in-hawaii",
  title: "Harleys In Hawaii",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.096917,
  ownProgress: 3.096917,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-10-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30UjBkRwwBeCdspCGPBB8V",
      externalLink: "https://open.spotify.com/album/30UjBkRwwBeCdspCGPBB8V",
    },
  ],
} as const satisfies Release
