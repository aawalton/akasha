import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixPtx = {
  id: "01a0676a-d727-702b-b843-5562e9a19f99",
  type: "page-type/release",
  slug: "pentatonix-ptx",
  title: "PTX",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2014-09-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77RBn8pRsfXlZdfTQh221D",
      externalLink: "https://open.spotify.com/album/77RBn8pRsfXlZdfTQh221D",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
