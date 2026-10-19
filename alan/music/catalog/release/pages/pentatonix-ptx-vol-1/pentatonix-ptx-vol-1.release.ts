import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPtxVol1 = {
  id: "01a0676a-d727-702d-9b1c-6e83c58f90e8",
  type: "page-type/release",
  slug: "pentatonix-ptx-vol-1",
  title: "PTX, Vol. 1",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
