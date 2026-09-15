import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPtxVol1 = {
  id: "01a0676a-d727-702d-9b1c-6e83c58f90e8",
  type: "release",
  slug: "pentatonix-ptx-vol-1",
  title: "PTX, Vol. 1",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 22.9209,
  ownProgress: 22.9209,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-06-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wGlP6EqF7akh6N3UGfKVZ",
      externalLink: "https://open.spotify.com/album/5wGlP6EqF7akh6N3UGfKVZ",
    },
  ],
} as const satisfies Release
